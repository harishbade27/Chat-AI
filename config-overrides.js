module.exports = function override(config) {
    const ruleIndex = config.module.rules.findIndex(rule => Array.isArray(rule.oneOf));
    const jsLoader = {
      test: /\.js$/,
      enforce: 'pre',
      use: ['source-map-loader'],
      exclude: /node_modules/,
    };
  
    if (ruleIndex !== -1) {
      config.module.rules.splice(ruleIndex, 0, jsLoader);
    }
  
    return config;
  };
  