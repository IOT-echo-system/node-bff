module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 88.88,
      functions: 93.75,
      lines: 97.4,
      statements: 97.53
    }
  }
}
