const path = require('path');
const glob = require('glob');

const mockFiles = glob.sync(path.resolve(process.cwd(), './test/mocks/**/*.ts'));

for (const file of mockFiles) {
  require(file);
}
