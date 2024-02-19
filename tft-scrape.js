const puppeteer = require('puppeteer');

const url = 'https://tactics.tools/augments';


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('.flex .w-full');
    // await page.screenshot({ path: 'test.png' });
    await browser.close;
  })();