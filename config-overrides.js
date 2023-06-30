const webpack = require('webpack');
module.exports = function override(config) {
  // Exclude *.stories.tsx, *.ts, and *.mdx files
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      exclude: /\.stories\.tsx?$/,
    },
    {
      test: /\.mdx?$/,
      exclude: /\.stories\.mdx?$/,
    }
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
