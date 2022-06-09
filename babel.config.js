const removeConsolePlugin = []

if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push('transform-remove-console')
}

if (process.env.NODE_ENV === 'test') {
  module.exports = {
    presets: [
      "@vue/cli-plugin-babel/preset",
      "@babel/preset-env"
    ],
    plugins: [
      "transform-require-context",
      "@babel/transform-runtime"
    ]
    // plugins: removeConsolePlugin
  }
} else {
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
    // plugins: removeConsolePlugin
  }
}

