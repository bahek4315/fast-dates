module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['ConditionalExpression']
            }
        ],
        'multiline-ternary': ['off'],
        semi: [2, 'always'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' }
        ]
    }
};
