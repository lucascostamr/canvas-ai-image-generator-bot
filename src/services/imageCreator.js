import clipboard from "clipboardy";

import { paste, selectAll, tab } from "../helpers/keyboard.js";
import { sleep } from "../helpers/common.js";

export async function imageCreator(page, prompt) {
  await setInput(page, prompt)
}

async function setInput(page, input) {
  await page
    .locator(
      "::-p-aria([name='Choose from the list of example prompts or write your own'][role='searchbox'])"
    )
    .click();

  await selectAll(page)

  clipboard.writeSync(input);

  await paste(page)

  await tab(page, 5)

  await page.keyboard.press("Enter", { delay: 100 });
}