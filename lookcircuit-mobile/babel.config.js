module.exports = function (api) {
    api.cache(false);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Plugin temporarily removed to bypass web resolution error
            // 'react-native-reanimated/plugin',
        ],
    };
};
