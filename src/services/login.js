import clipboard from "clipboardy";

import { paste, tab } from "../helpers/keyboard.js";
import { sleep } from "../helpers/index.js";

export async function loginGoogle(page) {
  await page.goto(process.env.GOOGLE_LOGIN_PAGE_URL, {
    waitUntil: "networkidle2",
  });

  clipboard.writeSync(process.env.GOOGLE_LOGIN_EMAIL);
  await paste(page);
  await page.keyboard.press("Enter", { delay: 100 });

  await page.waitForNetworkIdle();

  clipboard.writeSync(process.env.GOOGLE_LOGIN_PASSWORD);
  await paste(page);
  await page.keyboard.press("Enter", { delay: 100 });
}

export async function loginCanvasWithGoogle(page, browser) {
  await page.goto("https://www.canva.com/ai-image-generator/");
  await page.locator('span ::-p-text("Log in")').click();

  await page.waitForNetworkIdle();

  await sleep(10);

  await page.locator('span ::-p-text("Continue with Google")').click();

  await page.waitForNetworkIdle();

  await sleep(10);

  const pages = await browser.pages();
  const secondPage = pages.pop();

  await sleep(5);

  await tab(secondPage, 2);
  await secondPage.keyboard.press("Enter");

  await sleep(5);

  await tab(secondPage, 6);
  await secondPage.keyboard.press("Enter");
}
