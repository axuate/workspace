module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'html'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
