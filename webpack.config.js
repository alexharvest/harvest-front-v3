const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrebuildPlugin = require('prebuild-webpack-plugin');
const { tokens, pools } = require('./src/data');
const { formatItems, saveFormattedData } = require('./config/utils.js');
const loadEnv = require('./config/loadEnv')

const isDevMode = process.env.NODE_ENV === 'development';
const publicDir = isDevMode ? 'public' : 'build';

const fetchIconsFromAPI = () => {
  console.log(`Copying icons from harvest-api-v3 repo into ./${publicDir}/icons...`);
  fs.copy('./src/data/harvest-api-v3/data/icons', `./${publicDir}/icons`).catch(err =>
    console.error(err),
  );
};

const generateVaultsAndPoolsData = () => {
  console.log('Generating tokens list...');
  const formattedTokens = formatItems(tokens, [
    'pricesInfo',
    'hideFarmSymbol',
    'hideNativeApy',
    'hideFarmApy',
    'hideTokenApy',
    'hideiFarmSymbol',
    'testInactive',
    'disableAutoSwap',
    'fake',
    'disabledDepositTooltip',
    'disabledWithdrawTooltip',
    'rowTooltip',
    'disableVaultPanel',
  ]);
  saveFormattedData(formattedTokens, `./${publicDir}/data/tokens.json`);

  console.log('Generating pools list...');
  const formattedPools = formatItems(pools, [
    'stakeAndDepositHelpMessage',
    'info',
    'watchAsset',
    'hideFarmApy',
    'hideNativeApy',
    'rewardAPY',
    'rewardAPR',
  ]);
  saveFormattedData(formattedPools, `./${publicDir}/data/pools.json`);
};

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'process/browser': require.resolve('process/browser.js'),
    },
    fallback: {
      vm: require.resolve('vm-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url/'),
      process: require.resolve('process/browser.js'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  module: {
    rules: [
      // JS/JSX loader
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // CSS loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Image loader for PNG, JPG, WEBP, SVG, etc.
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|ico)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(loadEnv()),
    new HtmlWebpackPlugin({
      inject: true,
      // template: paths.appHtml,
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new PrebuildPlugin({
      build: () => {
        fetchIconsFromAPI();
        generateVaultsAndPoolsData();
      },
      watch: () => {
        fetchIconsFromAPI();
        generateVaultsAndPoolsData();
      },
      files: ['src/data/**/*'],
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    compress: true,
    port: 3000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 500000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
