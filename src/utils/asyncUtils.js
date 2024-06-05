
// asyncUtils.js: Utility functions for asynchronous operations

const pLimit = require('p-limit');

/**
 * Function: configureAsyncOperations
 * Description: Configures asynchronous operations and sets limits for parallel tasks.
 */
const configureAsyncOperations = () => {
    global.asyncLimit = pLimit(10); // Set global limit for async operations
};

/**
 * Function: runAsyncTask
 * Description: Runs an asynchronous task with rate limiting.
 * @param {function} task - Asynchronous task function to be executed.
 * @returns {Promise} Promise representing the result of the task execution.
 */
const runAsyncTask = async (task) => {
    return global.asyncLimit(task);
};

module.exports = {
    configureAsyncOperations,
    runAsyncTask
};
