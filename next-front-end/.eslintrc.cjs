module.exports = {
  plugins: ['@tanstack/query'],
  extends: ['next/core-web-vitals', 'airbnb', 'airbnb-typescript', 'plugin:@tanstack/eslint-plugin-query/recommended', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-plusplus': 0,
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
  },
};
