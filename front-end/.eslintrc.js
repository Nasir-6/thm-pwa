module.export = {
  // When converting from cjs to JSON - make sure key is in double quotes and any single quotes are replaced with double quotes
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 6
  },
  env: { es6: true },
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
  ignorePatterns: ["serviceWorkerRegistration.ts", "tailwind.config.js", "postcss.config.js"]
}
