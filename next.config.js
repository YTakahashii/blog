const PROJECT_NAME = '/tech-blog';
const isProd = process.env.NODE_ENV === 'production';
const STATIC_FOLDER = isProd ? PROJECT_NAME : '';

module.exports = {
  assetPrefix: STATIC_FOLDER,
  basePath: STATIC_FOLDER,
  staticFolder: STATIC_FOLDER,
};
