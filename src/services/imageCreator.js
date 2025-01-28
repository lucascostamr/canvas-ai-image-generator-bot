import clipboard from "clipboardy";

import {
    readCardsFromCsv,
    sleep,
} from "./helpers/index.js";

export async function imageCreator(page, cardList) {
    await page.goto("https://consultadanfe.com/", { waitUntil: "networkidle2" });
  
    await page.mouse.click(414, 196, { delay: 1000 });
  
    await process(keys);
  
    await writeKeysOnFile("public/keys.csv", keys.join("\n"));
  
    const failedKeys = await readKeysFromFile("public/failed-keys.csv");
  
    while (failedKeys.length > 0) {
      await process(failedKeys);
    }
  
    await writeKeysOnFile("public/keys.csv", failedKeys.join("\n"));
  
    async function process(keyList) {
      while (keyList.length > 0) {
        const key = keyList.shift();
  
        try {
          await getXml(key);
        } catch (error) {
          if (
            !(
              error instanceof RepeatTimesExaustedError ||
              error.name === "ERROR_RECAPTCHA_INVALID_SITEKEY"
            )
          ) {
            // Re-add current key to keys array
            keyList.push(key);
  
            await writeKeysOnFile("public/keys.csv", keyList.join("\n"));
            throw error;
          }
          await writeKeysOnFile("public/failed-keys.csv", key, { flag: "a" });
        }
      }
    }
  
    async function getXml(key) {
      if (repeatedTimes === 2) {
        repeatedTimes = 0;
        throw new RepeatTimesExaustedError("Repeated 2 times");
      }
  
      await page.waitForNetworkIdle();
  
      await clearInput();
  
      await sleep(2);
  
      clipboard.writeSync(key);
  
      await page.keyboard.down("Control");
      await page.keyboard.press("V");
      await page.keyboard.up("Control");
  
      await sleep(2);
  
      await page.keyboard.press("Enter", { delay: 100 });
  
      await page.waitForNetworkIdle();
  
      const captcha = await page.$$eval(
        'div[style*="width: 1901px;"]',
        ([el]) => el && window.getComputedStyle(el).visibility === "visible"
      );
  
      if (captcha) {
        const gResponse = await resolveCaptcha();
        await page.evaluate((gResponse) => onSubmitCH(gResponse), gResponse);
      }
  
      await page.waitForNetworkIdle();
  
      const errorAlertDisplayed = await page.$$eval(
        "#error",
        ([el]) => el && window.getComputedStyle(el).display !== "none"
      );
  
      if (errorAlertDisplayed) {
        console.error("Error Alert");
        repeatedTimes++;
        await getXml(key);
        return;
      }
  
      repeatedTimes = 0;
  
      try {
        await page.waitForSelector("#modalNFe", {
          visible: true,
          timeout: 60000,
        });
      } catch (error) {
        console.error("Download modal dosent showed");
  
        await page.reload({ waitUntil: "networkidle2" });
  
        repeatedTimes++;
        await getXml(key);
        return;
      }
  
      await page.mouse.click(853, 357, { delay: 1000 });
      await page.mouse.click(1154, 50, { delay: 1000 });
    }
  
    async function clearInput() {
      await page.click("#chave");
  
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
  
      await sleep(2);
  
      await page.keyboard.press("Backspace");
    }
}

async function login(page) {
    await page.
}