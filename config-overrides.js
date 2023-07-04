const webpack = require('webpack');
module.exports = function override(config) {
  // Exclude .stories.tsx and .stories.mdx files from the build
  config.module.rules = config.module.rules.filter(
    rule => !/\.stories\.(tsx|mdx)$/.test(rule.test)
  );

  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    assert: require.resolve('assert'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);
  return config;
};
