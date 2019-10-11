const env = process.env.NODE_ENV;
import siteConfig from '@site'

export const serverUrl = siteConfig.serverUrlConfig[env];

