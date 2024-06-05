
// aiTests.js: Test cases for AI functionalities

const assert = require('assert');
const { trainModel } = require('../src/services/aiService');

describe('AI Service Tests', () => {
    it('should train the model with given data', async () => {
        const data = {
            inputs: [[1, 2], [3, 4], [5, 6]],
            labels: [[1], [0], [1]]
        };

        const model = await trainModel(data);
        assert.ok(model, 'Model should be trained successfully');
        assert.ok(model.weights.length > 0, 'Model should have weights');
    });

    it('should handle training with invalid data', async () => {
        const data = {
            inputs: [[1, 2], [3, 4], [5, 6]],
            labels: [[1], [0]] // Mismatched labels
        };

        try {
            await trainModel(data);
            assert.fail('Model training should fail with invalid data');
        } catch (error) {
            assert.ok(error, 'Error should be thrown for invalid data');
        }
    });
});
