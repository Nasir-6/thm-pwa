module.export = {
  // When converting from cjs to JSON - make sure key is in double quotes and any single quotes are replaced with double quotes
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // "airbnb",
    // "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname, // ! Make sure to use .eslintrc.js and not .json so have access to __dirname!!
    sourceType: "module", // ! Add this tell eslint that import is fine to use
    ecmaVersion: 11, // 11 is es2020
  },
  env: { es2020: true },
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
};
