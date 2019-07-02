module.exports = {
  collectCoverageFrom: [
    "**/*.{js,ts}", //
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/", //
    "/test/",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleFileExtensions: [
    "ts", //
    "tsx",
    "js",
  ],
  testEnvironment: "node",
  transform: {
    ".tsx?": "ts-jest",
  },
};
