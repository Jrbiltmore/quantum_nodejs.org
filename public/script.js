
// script.js: JavaScript file for client-side interactions

const trainModel = async () => {
    const data = document.getElementById('ai-data').value;
    const response = await fetch('/api/ai/train', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: JSON.parse(data) })
    });
    const result = await response.json();
    document.getElementById('ai-result').innerText = JSON.stringify(result, null, 2);
};

const runQuantumJob = async () => {
    const circuit = document.getElementById('quantum-circuit').value;
    const response = await fetch('/api/quantum/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ circuit: JSON.parse(circuit) })
    });
    const result = await response.json();
    document.getElementById('quantum-result').innerText = JSON.stringify(result, null, 2);
};
