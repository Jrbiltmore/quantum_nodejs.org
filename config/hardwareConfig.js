
// hardwareConfig.js: Hardware-specific configuration settings

module.exports = {
    qpu: {
        provider: process.env.QPU_PROVIDER || 'defaultProvider',
        config: {
            apiKey: process.env.QPU_API_KEY || 'defaultApiKey',
            endpoint: process.env.QPU_ENDPOINT || 'defaultEndpoint'
        }
    }
};
