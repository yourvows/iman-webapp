import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
// import tailwind from 'eslint-plugin-tailwindcss'

export default [
    // ...tailwind.configs['flat/recommended'],
    eslintConfigPrettier,
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } }
    },
    {
        rules: {
            // 'tailwindcss/no-custom-classname': 'off',
            'no-magic-numbers': 'off',
            '@typescript-eslint/no-magic-numbers': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ],

            'vue/block-lang': [
                'error',
                {
                    script: {
                        lang: 'ts'
                    }
                }
            ],
            'vue/block-order': [
                'error',
                {
                    order: ['script[setup]', 'template', 'style']
                }
            ],
            'vue/define-emits-declaration': ['error', 'type-based'],
            'vue/define-macros-order': [
                'error',
                {
                    order: ['defineProps', 'defineEmits'],
                    defineExposeLast: true
                }
            ],
            'vue/define-props-declaration': ['error', 'type-based'],
            'vue/no-multiple-objects-in-class': 'warn',
            'vue/no-async-in-computed-properties': 'error',
            'vue/no-child-content': 'error',
            'vue/no-unused-vars': 'warn',
            'vue/no-use-v-if-with-v-for': 'error',
            'vue/prefer-separate-static-class': 'error',
            'vue/prefer-true-attribute-shorthand': 'warn',
            'vue/html-self-closing': 'off',
            'vue/html-comment-content-newline': 'warn',
            'vue/multi-word-component-names': 'off',
            // TypeScript rules
            '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: true }],
            '@typescript-eslint/no-empty-function': 'warn',
            '@typescript-eslint/no-empty-object-type': 'warn',
            'no-console': 'warn',
            eqeqeq: 'off'
        }
    }
]
