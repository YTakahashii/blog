const PROJECT_NAME = '/tech-blog';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? PROJECT_NAME : '',
};
