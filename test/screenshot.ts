import path from 'node:path';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer, { Browser } from 'puppeteer-core';

const VIEWPORT_SIZES = {
  'desktop': { width: 1920, height: 1080 },
  'mobile': { width: 360, height: 800 },
};

describe('Screenshot test', () => {
  let browser: Browser;

  beforeAll(async () => {
    expect.extend({ toMatchImageSnapshot });

    const args = process.getuid?.() == 0 ?
      ['--autoplay-policy=user-gesture-required', '--no-sandbox'] :
      ['--autoplay-policy=user-gesture-required'];
    browser = await puppeteer.launch(process.env['CHROME_BIN'] ?
      { executablePath: process.env['CHROME_BIN'], args } :
      { channel: 'chrome', args });
  }, 30_000);

  afterAll(async () => {
    await browser.close();
  });

  it.each<{ viewport: keyof typeof VIEWPORT_SIZES }>([
    { viewport: 'desktop' },
    { viewport: 'mobile' },
  ])('matches $viewport image snapshot', async ({ viewport }) => {
    const page = await browser.newPage();
    const absPath = path.join(__dirname, '../dist/index.html');
    await page.goto(`file://${absPath}`);
    await page.setViewport(VIEWPORT_SIZES[viewport]);
    await page.waitForNetworkIdle();
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});
