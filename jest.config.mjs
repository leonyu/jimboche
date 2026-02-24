/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testMatch: ['<rootDir>/test/**/*.ts'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
