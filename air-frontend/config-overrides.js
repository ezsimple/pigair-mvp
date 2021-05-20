const {
  addDecoratorsLegacy,
  disableEsLint,
  override
} = require('customize-cra');

// Edge 안됨
module.exports = {
  webpack: override(disableEsLint(), addDecoratorsLegacy())
};
