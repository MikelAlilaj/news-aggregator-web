const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',   
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: 'bundle.js',   
  },
  plugins: [
    new Dotenv({
      path: `.env`,
    }),
 ],   
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  
        exclude: /node_modules/,  
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  
          },
        },
      },
      {
        test: /\.css$/,  
        use: ['style-loader', 'css-loader'],  
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  
    },
    port: 3000, 
    historyApiFallback: true,  
  },
  resolve: {
    extensions: ['.js', '.jsx'],  
  },
};
