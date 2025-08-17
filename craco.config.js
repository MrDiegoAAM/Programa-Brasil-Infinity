const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignorar avisos de dependências críticas específicas
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules/,
          message: /Critical dependency: the request of a dependency is an expression/,
        },
        /Critical dependency: the request of a dependency is an expression/,
      ];
      
      return webpackConfig;
    },
  },
};