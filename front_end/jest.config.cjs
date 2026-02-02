module.exports = {
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.js"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
