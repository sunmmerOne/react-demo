const path = require('path');
// const defaultConfig = require('../buildConfig/defaultConfig');
const defaultConfig = require('../scripts/tools/utils').argv;
const { site, project } = defaultConfig;
// 打包路径
// const distPath = `dist/${site}/${project}/client/`;
const distPath = path.join('dist', site, project, 'client', '/');

const build = {

    cacheId: 'react-admin',

    // 生成的文件名称
    filename: 'service-worker.js',

    // 需缓存的文件配置, 可以逐项添加, 需动态缓存的放到runtimeCaching中处理
    staticFileGlobs: [
        `${distPath}*.html`,
        `${distPath}favicon.ico`,
        // `${distPath}**/**.*`,
        `${distPath}font/**.*`,
        `${distPath}img/**.*`,
        `${distPath}js/**.js`,
        `${distPath}stylesheet/**.css`,
    ],

    // webpack生成的静态资源全部缓存
    mergeStaticsConfig: false,

    // 忽略的文件
    // map文件不需要缓存
    staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /\.gz$/,
    ],

    // 需要省略掉的前缀名
    stripPrefix: distPath,

    // 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的
    navigateFallback: '/index.html',

    // 白名单包含所有的.html (for HTML imports) 和路径中含 `/data/`
    navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],

    // 是否压缩，默认不压缩
    minify: true,

    // 最大缓存大小 50M
    maximumFileSizeToCacheInBytes: 50*1024*1024,

    // 生成service-worker.js的文件配置模板，不配置时采用默认的配置
    // 本demo做了sw的更新策略，所以在原有模板基础做了相应的修改
    // templateFilePath: path.resolve(__dirname, './sw.tmpl.js'),
    // templateFilePath: './sw.tmpl.js',

    verbose: true,

    // 需要根据路由动态处理的文件
    runtimeCaching: [
        {
            urlPattern: /\/fonts\/|\.ttf|\.eot|\.svg|\.woff/,
            handler: 'fastest',
            options: {
                cache: {
                    maxEntries: 10,
                    name: 'fonts-cache'
                }
            }
        },
    ]
};

module.exports = build;