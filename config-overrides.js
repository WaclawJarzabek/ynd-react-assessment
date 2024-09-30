const path = require('path');

module.exports = function override(config, env) {
    config.resolve = {
        ...config.resolve, 
        fallback: { "querystring": require.resolve("querystring-es3") }, //Required polyfill for parse-link-header lib
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@": path.resolve(__dirname, "src"),
        }
    }; 
    return config
}
