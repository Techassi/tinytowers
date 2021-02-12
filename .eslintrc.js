module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4],
    },
};
