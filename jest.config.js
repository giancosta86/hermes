module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"]
  },

  testPathIgnorePatterns: ["/_.+"],

  coveragePathIgnorePatterns: ["<rootDir>/src/proximity"],

  setupFilesAfterEnv: ["jest-extended/all"]
};
