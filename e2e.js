const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  await page.goto('http://localhost:1235');

  const dashboardResults = await new AxePuppeteer(page).analyze();

  await page.goto('http://localhost:1235/settings');

  const settingsResults = await new AxePuppeteer(page).analyze();

  await page.close();
  await browser.close();
})();
