module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/main.ts',
    '!<rootDir>/src/**/*.dto.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/**/*.interface.ts',
    '!<rootDir>/src/**/*.decorator.ts',
    '!<rootDir>/src/**/*.exception.ts',
    '!<rootDir>/src/**/*.filter.ts',
    '!<rootDir>/src/**/*.schema.ts',
    '!<rootDir>/src/shared/config/*',
    '!<rootDir>/src/**/mocks/*',
    '!<rootDir>/src/**/env.ts',
  ],
  coverageDirectory: 'cov',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      lines: 95,
      branches: 95,
      functions: 95,
    },
  },
};
