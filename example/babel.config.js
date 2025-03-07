const path = require('path')
const pak = require('../package.json')

module.exports = function(api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['react-native-unistyles/plugin', {
                autoProcessPaths: 'react-native-unistyles-grid/src',
            }],
            [
                'module-resolver',
                {
                    alias: {
                        // For development, we want to alias the library to the source
                        [pak.name]: path.join(__dirname, '../src/index'),
                    },
                },
            ],
        ],
    }
}
