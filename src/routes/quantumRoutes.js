
// quantumRoutes.js: Defines API routes for quantum functionalities

const express = require('express');
const router = express.Router();
const { runQuantumJob } = require('../services/quantumService');

/**
 * Route: /run
 * Description: Endpoint to run a quantum computing job with the provided circuit
 * Method: POST
 * @param {object} req.body - Quantum circuit data
 * @returns {object} Result of the quantum job execution
 */
router.post('/run', async (req, res) => {
    try {
        const { circuit } = req.body;
        const result = await runQuantumJob(circuit);
        res.status(200).json({
            message: 'Quantum job executed successfully',
            result: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
