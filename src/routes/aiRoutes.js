
// aiRoutes.js: Defines API routes for AI functionalities

const express = require('express');
const router = express.Router();
const { trainModel } = require('../services/aiService');

/**
 * Route: /train
 * Description: Endpoint to train an AI model with the provided data
 * Method: POST
 * @param {object} req.body - Data for training the model
 * @returns {object} Trained model details and performance metrics
 */
router.post('/train', async (req, res) => {
    try {
        const data = req.body;
        const model = await trainModel(data);
        res.status(200).json({
            message: 'Model trained successfully',
            modelDetails: model.toJSON()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Route: /predict
 * Description: Endpoint to make predictions using the trained AI model
 * Method: POST
 * @param {object} req.body - Data for making predictions
 * @returns {object} Predictions
 */
router.post('/predict', async (req, res) => {
    try {
        const { model, inputData } = req.body;
        const predictions = model.predict(tf.tensor(inputData));
        res.status(200).json({
            message: 'Predictions made successfully',
            predictions: predictions.arraySync()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
