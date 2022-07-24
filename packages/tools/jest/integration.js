const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  roots: ['test/integration'],
  setupFilesAfterEnv: ['reflect-metadata']
};
