const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const PROJECT_NAME = '/tech-blog';

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return { ...defaultConfig, assetPrefix: PROJECT_NAME, basePath: PROJECT_NAME };
  }
  return defaultConfig;
};
