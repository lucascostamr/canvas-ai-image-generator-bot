import clipboard from "clipboardy";

import { paste, selectAll, tab } from "../helpers/keyboard.js";
import { sleep } from "../helpers/common.js";

export async function imageCreator(page, prompt) {
  await setInput(page, prompt)
  await sleep(15)
  await page.waitForNetworkIdle();
  await selectImage(page, prompt)
}

async function setInput(page, input) {
  await page
    .locator(
      "::-p-aria([name='Escolha um dos exemplos de comando da lista ou escreva o seu'][role='searchbox'])"
    )
    .click();

  await selectAll(page)

  clipboard.writeSync(input);

  await paste(page)

  await tab(page, 5)

  await page.keyboard.press("Enter", { delay: 100 });
}

async function selectImage(page, input) {
  await page
  .locator(
    `::-p-aria([name='${input}'][role='button'])`
  )
  .click();
}