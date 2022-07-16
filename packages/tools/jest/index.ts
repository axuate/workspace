export default {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  collectCoverageFrom: ['src/**/*.ts'],
  setupFilesAfterEnv: ['reflect-metadata'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
