const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const merge = require('webpack-merge');
const { settings } = require('./package.json');
require('babel-polyfill');


module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.js',
    ],
  },


  devtool: 'cheap-eval-source-map',


  // Configurações do servidor de desenvolvimento local
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    port: 3000,
    publicPath: '/',
    stats: 'minimal',
    watchContentBase: true,
  },


  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=eslint'],
      },
      {
        test: /\.css$/,
        loaders: ['happypack/loader?id=css'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=sass'],
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: ['pug-loader'],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: ['json-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['happypack/loader?id=js'],
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|ogv|txt|mp3|ogg|wav|pdf)$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, './src'),
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        use: ['url-loader?name=fonts/[name].[ext]'],
      },
    ],
  },


  plugins: [
    new HappyPack({
      id: 'css',
      verbose: false,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
        },
      ],
    }),
    new HappyPack({
      id: 'sass',
      verbose: false,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            root: './dist/images',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [autoprefixer({
                browsers: ['> 1%', 'last 2 versions'],
              })];
            },
          },
        },
        {
          loader: 'sass-loader',
        },
        {
          loader: 'import-glob-loader',
        },
      ],
    }),
    new HappyPack({
      id: 'eslint',
      verbose: false,
      loaders: [
        {
          loader: 'eslint-loader',
          cache: true,
        },
      ],
    }),
    new HappyPack({
      id: 'js',
      verbose: false,
      loaders: [
        {
          loader: 'babel-loader',
          exclude: [/node_modules/, 'transform-regenerator'],
          include: path.resolve(process.cwd(), 'src'),
        },
      ],
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
    }),

    new StyleLintPlugin({
      syntax: 'scss',
      lintDirtyModulesOnly: true,
    }),

    // Variáveis globais usadas na aplicação
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(settings.envs.development),
      ENV: JSON.stringify('development'),
    }),

    new CopyWebpackPlugin([
      {
        from: './src/images',
        to: './images',
      },
    ]),

    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.png',
      title: 'Hexablau',
      template: './src/index.pug',
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],


  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/scripts/constants'),
      '@formatters': path.resolve(__dirname, 'src/scripts/formatters'),
      '@validations': path.resolve(__dirname, 'src/scripts/validations'),
      '@core': path.resolve(__dirname, 'core/index'),
    },
    extensions: ['.js'],
  },


  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
};
