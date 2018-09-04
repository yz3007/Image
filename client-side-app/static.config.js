import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },

  siteRoot: '.',

  webpack: (config, {defaultLoaders, stage}) => {

    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: stage === 'dev' ?
              [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
              : ExtractTextPlugin.extract({
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: false,
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {includePaths: ['client/styles']},
                  },
                ],
              }),
          },
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: (path) =>
              /node_modules\/query-string/.test(path) ||
              /node_modules\/strict-uri-encode/.test(path) ||
              /node_modules\/dygraphs/.test(path)
                ? false : /node_modules/.test(path),
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              }
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    config.plugins.push(new ExtractTextPlugin('styles.css'))
    return config
  },
}
