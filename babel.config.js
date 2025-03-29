module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: { 
        chrome: '58',
        ie: '11'
      }
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      "absoluteRuntime": false,
      "corejs": 3,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }]
  ]
}