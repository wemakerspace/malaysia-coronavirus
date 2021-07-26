module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {
      "ignoreTemplateLiterals": true,
      "ignoreUrls": true,
    }],
  },
};
