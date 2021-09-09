const { configureAxe } = require('jest-axe');

const axe = configureAxe({
  rules: {
    // turn off the region role since we're not mounting our individual
    // components within the full layout UI (<main /> etc...)
    region: { enabled: false }
  }
});

module.exports = axe;
