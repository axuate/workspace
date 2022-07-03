module.exports = {
  default: [
    '--require ./test/steps/**.ts',
    '--require-module ts-node/register',
    '--publish-quiet'
  ].join(' ')
};
