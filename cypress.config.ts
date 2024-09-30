import { defineConfig } from 'cypress';

/**
 * "Rewire" the webpack config before `loadWebpackConfig` accesses it through `react-scripts`
 * @see @cypress/webpack-dev-server/dist/helpers/createReactAppHandler.js:41
 */
process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
require('react-app-rewired/config/webpack.config')('development');

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});