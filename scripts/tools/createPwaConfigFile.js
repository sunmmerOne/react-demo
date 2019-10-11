const fs = require('fs');
const path = require('path');

const buildConfig = require('./utils');
const { site, project } = buildConfig.argv;
// const { pwa } = require('../buildConfig/defaultConfig');

const pwaConfigFilePath = path.join('dist', site, project, 'client', 'pwaConfig.json');

const createPwaConfigFile = pwa => {
    try{
        fs.writeFileSync(pwaConfigFilePath, `{"pwa":${pwa}}`);
    }catch (e){
        console.log('createPwaConfigFile', e);
    }
};
// createPwaConfigFile(true);
module.exports = createPwaConfigFile;
