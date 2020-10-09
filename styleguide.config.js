module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json'
  ).parse,
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.output.filename = 'build/bundle.js';
    webpackConfig.output.chunkFilename = 'build/[name].js';
    return webpackConfig;
  },
  styleguideDir: 'doc',
};
