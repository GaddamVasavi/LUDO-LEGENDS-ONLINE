import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/unit', '<rootDir>/integration'],
  moduleNameMapper: {
    '^@ludo/shared$': '<rootDir>/../shared/src/index.ts',
  },
};

export default config;
