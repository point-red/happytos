module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-lone-template': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/no-child-content': 'off',
    'handle-callback-err': 'off',
    eqeqeq: 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020
  }
}
