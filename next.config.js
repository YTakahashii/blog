const { PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    return { ...defaultConfig, assetPrefix: 'tech-blog' };
  }
  return defaultConfig;
};
