const path = require('path');

module.exports = {
  roots: ['src/'],
  setupFilesAfterEnv: ['reflect-metadata', path.resolve(__dirname, 'jestSetup.js')],
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  collectCoverageFrom: ['src/**/*.ts']
};
