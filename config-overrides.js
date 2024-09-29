module.exports = function override(config, env) {
    config.resolve = {...config.resolve, fallback: { "querystring": require.resolve("querystring-es3") }}; //Required polyfill for parse-link-header lib
    return config
}
