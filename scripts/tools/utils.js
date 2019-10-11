const {
    defaultSite,
    defaultProject,
    pwa,
} = require( '../../buildConfig/defaultConfig');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

const project = argv['project'] || defaultProject;
const site = typeof argv['site'] === 'string' ? argv['site'] : defaultSite;

const exclude = new RegExp(project);

exports.cssLoaders = (options = {}) => {
    // generate loader string to be used with extract text plugin
    const generateLoaders = loaders => {
        const sourceLoader = loaders.map(loader => {
            let extraParamChar;
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&'
            } else {
                loader = loader + '-loader';
                extraParamChar = '?'
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
        }).join('!');

        // Extract CSS when that option is specified
        if (options.extract) {
            let _options = {
                use: sourceLoader,
                fallback: 'style-loader',
            };

            if (options.publicPath) {
                _options = Object.assign(_options, {
                    publicPath: options.publicPath
                });
            }
            return ExtractTextPlugin.extract(_options);

        } else {
            return ['style-loader', sourceLoader].join('!')
        }
    };

    return {
        css: generateLoaders(['css', 'postcss']),
        postcss: generateLoaders(['css']),
        // less: generateLoaders(['css', `less?{modifyVars: {"@icon-url": '"/src/client/iconfont/iconfont"',}}`]),
        less: generateLoaders(['css', `less`]),
        sass: generateLoaders(['css', 'postcss', 'sass?indentedSyntax']),
        scss: generateLoaders(['css', 'postcss', 'sass']),
        stylus: generateLoaders(['css', 'stylus']),
        styl: generateLoaders(['css', 'stylus'])
    }
};

// Generate loaders for standalone style files
exports.styleLoaders = options => {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension of Object.keys(loaders)) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader,
        })
    }
    return output;
};

exports.argv = {
    pwa,
    site,
    project,
    defaultSite,
    defaultProject,
};
