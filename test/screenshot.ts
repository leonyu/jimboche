import path from 'node:path';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer, { Browser } from 'puppeteer';

describe('Screenshot test index.html', () => {
  beforeAll(() => {
    expect.extend({ toMatchImageSnapshot });
  });

  let browser: Browser;

  beforeEach(async () => {
    browser = await puppeteer.launch(process.env['CHROME_BIN'] ? {
      executablePath: process.env['CHROME_BIN'],
      args: ['--autoplay-policy=user-gesture-required', '--no-sandbox', '--disable-setuid-sandbox']
    } : {
      args: ['--autoplay-policy=user-gesture-required']
    });
  });

  it('should match desktop image snapshot', async () => {
    const page = await browser.newPage();
    const absPath = path.join(__dirname, '../dist/index.html');
    await page.goto(`file://${absPath}`);

    await page.setViewport({ width: 1920, height: 1080 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });

  it('should match mobile image snapshot', async () => {
    const page = await browser.newPage();
    const absPath = path.join(__dirname, '../dist/index.html');
    await page.goto(`file://${absPath}`);

    await page.setViewport({ width: 360, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });

  afterEach(async () => {
    await browser?.close();
  });
});
