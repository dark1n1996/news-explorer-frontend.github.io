module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    eqeqeq: 0,
  },
  globals: {
    'localStorage': true,
    'fetch': true,
    'window': true,
    'document': true,
  },
};
