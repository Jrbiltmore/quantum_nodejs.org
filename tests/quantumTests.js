
// quantumTests.js: Test cases for quantum functionalities

const assert = require('assert');
const { runQuantumJob } = require('../src/services/quantumService');

describe('Quantum Service Tests', () => {
    it('should run the quantum job with given circuit', async () => {
        const circuit = {
            // Example quantum circuit data
            qubits: 2,
            gates: [
                { gate: 'H', targets: [0] },
                { gate: 'CNOT', targets: [1], controls: [0] }
            ]
        };

        const result = await runQuantumJob(circuit);
        assert.ok(result, 'Quantum job should run successfully');
        assert.ok(result.data, 'Result should contain data');
    });

    it('should handle running quantum job with invalid circuit', async () => {
        const circuit = {
            // Invalid quantum circuit data
            qubits: 2,
            gates: [
                { gate: 'INVALID_GATE', targets: [0] }
            ]
        };

        try {
            await runQuantumJob(circuit);
            assert.fail('Quantum job should fail with invalid circuit');
        } catch (error) {
            assert.ok(error, 'Error should be thrown for invalid circuit');
        }
    });
});
