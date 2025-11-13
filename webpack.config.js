const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ensure react-native-reanimated is transpiled for web
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(oneOfRule => {
        if (oneOfRule.test && oneOfRule.test.toString().includes('js|mjs|jsx|ts|tsx')) {
          if (oneOfRule.include && oneOfRule.include.length > 0) {
            // Add react-native-reanimated to the list of modules to be transpiled
            oneOfRule.include.push(/react-native-reanimated/);
          }
        }
      });
    }
  });

  return config;
};
