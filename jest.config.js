// Thanks to: https://github.com/facebook/jest/issues/1468#issuecomment-276753756

module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
  },
};
