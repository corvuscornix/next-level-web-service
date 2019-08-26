// Thanks to: https://github.com/facebook/jest/issues/1468#issuecomment-276753756

// Custom Jest transform implementation that wraps babel-jest and injects our
// babel presets, so we don't have to use .babelrc as any added babel config will break the Now configuration!

module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});
