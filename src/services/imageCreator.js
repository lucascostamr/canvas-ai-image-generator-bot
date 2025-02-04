import clipboard from "clipboardy";

import { paste, selectAll, tab } from "../helpers/keyboard.js";
import { sleep } from "../helpers/common.js";

export async function imageCreator(page, prompt) {
  await page.goto(
    "https://deepai.org/machine-learning-model/cyberpunk-generator"
  );

  const textarea = await page.$(".model-input-text-input.dynamic-border");
  const downloadBtn = await page.$("#download-button");
  await textarea.click();

  selectAll(page);
  await page.keyboard.press("Backspace", { delay: 100 });

  clipboard.writeSync(prompt);
  await paste(page);
  await tab(page, 2);
  await page.keyboard.press("Enter", { delay: 100 });
  await textarea.click();
  await page.keyboard.press("Enter", { delay: 100 });

  await sleep(8);

  await downloadBtn.click();
}
