import fs from 'node:fs/promises';
import path from 'node:path';

import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer, { Browser } from 'puppeteer-core';

const VIEWPORTS = {
  'desktop': { width: 1920, height: 1080 },
  'mobile': { width: 360, height: 800 },
};

describe('Screenshot test', () => {
  let browser: Browser;

  beforeAll(async () => {
    const chromeBin = await locateBinary(CHROME_BIN_PATHS);
    browser = await puppeteer.launch({
      executablePath: chromeBin,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=user-gesture-required']
    });

    expect.extend({ toMatchImageSnapshot });
  });

  afterAll(async () => {
    await browser.close();
  });

  it.each<{ viewport: keyof typeof VIEWPORTS }>([
    { viewport: 'desktop' },
    { viewport: 'mobile' },
  ])('matches $viewport image snapshot', async ({ viewport }) => {
    const page = await browser.newPage();
    const absPath = path.join(__dirname, '../dist/index.html');
    await page.goto(`file://${absPath}`);
    await page.setViewport(VIEWPORTS[viewport]);
    await page.waitForNetworkIdle();
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      comparisonMethod: 'ssim',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  });
});

const CHROME_BIN_PATHS = [
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
];

async function locateBinary(binPaths: string[]): Promise<string> {
  for (const binPath of binPaths) {
    if (await fs.access(binPath, fs.constants.X_OK).then(() => true).catch(() => false)) {
      return binPath;
    }
  }
  throw new Error(`Binary not found: ${binPaths.join(', ')}`);
}
