const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './';
const { paths } = require('./tsconfig.json').compilerOptions;

tsConfigPaths.register({
  baseUrl,
  paths
});
