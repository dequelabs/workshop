// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  config.env.CONFIG = JSON.stringify({
    axe: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    },
    selectors: {
      h1: 'h1,[role="heading"][aria-level="1"]',
      heading: 'h1,h2,h3,h4,h5,h6,[role="heading"][aria-level]',
      main: 'main,[role="main"]',
      link: 'a[href],[role="link"]',
      image: 'img,[role="img"]',
      button: 'button[type="button"],[role="button"]',
      dialog: '[role="dialog"]'
    }
  });

  return config;
};
