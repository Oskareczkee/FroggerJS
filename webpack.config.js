const path = require('path');

module.exports = {
  entry: './public/js/script.js',
  output: {
    filename: 'game-bundle.js',
    path: path.resolve(__dirname, './public/js'),
  },
};