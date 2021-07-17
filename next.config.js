const basePath = process.env.NEXT_PUBLIC_BASE_PATH ? process.env.NEXT_PUBLIC_BASE_PATH : '';

module.exports = {
  assetPrefix: basePath,
  basePath: basePath,
};
