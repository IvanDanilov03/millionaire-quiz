/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.test-dist/'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.ts',
    '^assets/(.*)$': '<rootDir>/tests/__mocks__/fileMock.ts',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^ui/(.*)$': '<rootDir>/src/ui/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
    '^types/(.*)$': '<rootDir>/types/$1',
    '^theme$': '<rootDir>/src/theme',
    '^theme/(.*)$': '<rootDir>/src/theme/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^next/image$': '<rootDir>/tests/__mocks__/nextImageMock.tsx',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/public/',
    '/tests/',
    '/types/',
  ],
};
