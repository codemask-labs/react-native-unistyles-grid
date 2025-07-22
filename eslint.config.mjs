import { codemaskConfig } from 'eslint-config-codemask'

export default [
    ...codemaskConfig,
    {
        rules: {
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    'args': 'all',
                    'argsIgnorePattern': '^_',
                    'caughtErrors': 'all',
                    'caughtErrorsIgnorePattern': '^_',
                    'destructuredArrayIgnorePattern': '^_',
                    'varsIgnorePattern': '^_',
                    'ignoreRestSiblings': true,
                },
            ],
            'functional/immutable-data': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    {
        ignores: ['example', 'eslint.config.mjs'],
    },
]
