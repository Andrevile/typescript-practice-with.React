const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', //production
  devtool: 'eval', //hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },

  entry: {
    app: './client', //client.tsx 라는 파일이 메인 파일이 되고 이 파일을 통해 app.js를 만들어냄
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, //ts파일이나 tsx 파일
        loader: 'ts-loader', //ts-loader를 통해서 옛날 문법으로 변환하겠다.
      },
    ],
  }, //module와 plugins 에 적힌 처리과정을 client.tsx에 적용해서 app.js를 만들어냄
  plugins: [],
  output: {
    filename: '[name].js', // 'app.js'라고 해도 됨 [name]은 entry에 적힌 key 값을 의미
    path: path.join(__dirname, 'dist'), //dist 라는 폴더가 생기고 그 안에 app.js가 생김
  },
};
