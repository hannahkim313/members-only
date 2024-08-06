const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');
const pluginJs = require('@eslint/js');

module.exports = [
  prettierConfig,
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
];
