const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Функция для чтения компонентов
function readComponent(componentPath) {
  return fs.readFileSync(path.resolve(__dirname, componentPath), 'utf8');
}

// Компоненты для вставки
const components = {
  header: readComponent('./src/components/header/header.html'),
  footer: readComponent('./src/components/footer/footer.html'),
  test: readComponent('./src/components/test/test.html'),
};

// Страницы для генерации
const pages = ['home', 'about'];

const htmlPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: `src/pages/${page}/${page}.html`,
      inject: true,
      templateParameters: components,
    })
);

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: pages.reduce((config, page) => {
      config[page] = `./src/pages/${page}/${page}.js`;
      return config;
    }, {}),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/images',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/fonts',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets/images', to: 'assets/images' },
          { from: 'src/assets/fonts', to: 'assets/fonts' },
        ],
      }),
      ...htmlPlugins,
    ],
    devServer: {
      hot: true,
      liveReload: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      open: true,
      compress: true,
      port: 9000,
    },
  };
};
