const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add alias for react-native-safe-area-context to use a mock for web
  config.resolve.alias['react-native-safe-area-context'] = path.resolve(
    __dirname,
    'mocks/react-native-safe-area-context.js'
  );

  // Add a rule to prevent Webpack from parsing react-native-safe-area-context as CommonJS
  config.module.rules.push({
    test: /node_modules\/react-native-safe-area-context\//,
    parser: { amd: false, commonjs: false },
  });

  // Find the Babel loader rule
  const babelLoaderRule = config.module.rules.find(
    rule => rule.use && rule.use.loader && rule.use.loader.includes('babel-loader')
  );

  if (babelLoaderRule) {
    const originalExclude = babelLoaderRule.exclude;
    const reanimatedPath = path.join('node_modules', 'react-native-reanimated');

    babelLoaderRule.exclude = (modulePath) => {
      if (modulePath.includes(reanimatedPath + path.sep) || modulePath === reanimatedPath) {
        return false;
      }
      if (typeof originalExclude === 'function') {
        return originalExclude(modulePath);
      }
      if (originalExclude instanceof RegExp) {
        return originalExclude.test(modulePath);
      }
      return false;
    };
  }

  // Inject the require-polyfill.js into index.html
  config.plugins.forEach((plugin) => {
    if (plugin instanceof HtmlWebpackPlugin) {
      plugin.options.headScripts = [
        {
          src: './require-polyfill.js', // Path relative to the output directory
          type: 'text/javascript',
        },
        ...(plugin.options.headScripts || []), // Keep existing head scripts
      ];
    }
  });

  return config;
};
