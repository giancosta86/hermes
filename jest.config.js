module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"]
  },

  testPathIgnorePatterns: ["<rootDir>/dist/", "/_.+"],

  coveragePathIgnorePatterns: ["<rootDir>/src/proximity"],

  setupFilesAfterEnv: ["jest-extended/all"]
};
