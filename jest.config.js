module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"]
  },

  testPathIgnorePatterns: ["/_.+", "<rootDir>/dist/"],

  coveragePathIgnorePatterns: ["<rootDir>/src/proximity"],

  setupFilesAfterEnv: ["jest-extended/all"]
};
