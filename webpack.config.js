const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = env => {
  return ({
    mode: env.MODE,
    entry: {
      "app": './src/index.ts',
      "editor.worker": 'monaco-editor/esm/vs/editor/editor.worker.js'
    },
    devtool: env.MODE === 'development' ? 'inline-source-map' : 'none',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.ttf$/,
        use: ['file-loader']
      },{
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
    ]
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.tsx?$/,
    //       use: 'ts-loader',
    //       exclude: /node_modules/
    //     },
    //     {
    //       test: /\.(html)$/,
    //       use: {
    //         loader: 'html-loader',
    //         options: {
    //           attrs: false,
    //         },
    //       },
    //     },
    //     {
    //       test: /\.css$/,
    //       include: /node_modules/,
    //       loaders: ['style-loader', 'css-loader'],
    //     },
    //     {
    //       test: /\.(ttf|eot|woff|woff2)$/,
    //       use: {
    //         loader: "file-loader",
    //         options: {
    //           name: "fonts/[name].[ext]",
    //         },
    //       },
    //     },
    //   ],
    // },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      globalObject: 'self',
		  filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin([
        { from: 'node_modules/@webcomponents/webcomponentsjs', to: 'webcomponentsjs' },
      ]),
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'public/index.html'
      })
    ]
  });
};
