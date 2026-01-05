import antfu from '@antfu/eslint-config';

export default antfu({
    stylistic: {
        indent: 4,
        semi: true,
    },
    yaml: {
        overrides: {
            'yaml/indent': ['error', 2],
        },
    },
    formatters: true,
    vue: true,
    typescript: true,
});
