
// dbConfig.js: Database configuration settings

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/quantumdb',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
};
