module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/views/inventory/correction/Create.vue",
      "src/views/inventory/correction/Edit.vue",
      "!**/node_modules/**"
    ],
    moduleFileExtensions: [
      "js",
      "json",
      "vue"
    ],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    modulePathIgnorePatterns: ["e2e"],
    transform: {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!point-table-vue)/",
      "/node_modules/(?!sweet-modal-vue)/"
    ],
    testMatch: [
        "<rootDir>/tests/unit/**/*.spec.js"
    ],
    testEnvironment: "jsdom"
  };