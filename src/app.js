
// src/app.js: Entry point of the application

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winston = require('winston');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cluster = require('cluster');
const os = require('os');
const aiRoutes = require('./routes/aiRoutes');
const quantumRoutes = require('./routes/quantumRoutes');
const { configureHardware } = require('./utils/hardwareUtils');
const { configureAsyncOperations } = require('./utils/asyncUtils');
const dbConfig = require('../config/dbConfig');
const hardwareConfig = require('../config/hardwareConfig');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream.write }));
app.use(helmet());
app.use(limiter);
app.use(cors());

// Database Connection
mongoose.connect(dbConfig.url, dbConfig.options).then(() => {
    logger.info('Successfully connected to the database');
}).catch(err => {
    logger.error('Database connection error:', err);
    process.exit();
});

// Hardware Configuration
configureHardware(hardwareConfig);

// Asynchronous Operations Configuration
configureAsyncOperations();

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/quantum', quantumRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Quantum Node.js Website!');
});

// Error Handling
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

app.use((err, req, res, next) => {
    if (!err.isOperational) {
        logger.error('Unexpected Error:', err);
        res.status(500).send({ error: 'Something went wrong!' });
    } else {
        logger.warn('Operational Error:', err);
        res.status(err.statusCode).send({ error: err.message });
    }
});

// Start the Server
if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.error(`Worker ${worker.process.pid} died. Forking a new worker.`);
        cluster.fork();
    });
} else {
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
    });
}

module.exports = app;
