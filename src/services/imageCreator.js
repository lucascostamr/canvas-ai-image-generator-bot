import clipboard from "clipboardy";

import { paste, selectAll, tab } from "../helpers/keyboard.js";
import { sleep } from "../helpers/common.js";
import { renameAndMoveFile } from "../helpers/file.js";

export async function imageCreator(page, cardsList) {
  await page.goto("https://deepai.org/machine-learning-model/text2img");

  const textarea = await page.$(".model-input-text-input.dynamic-border");
  const downloadBtn = await page.$("#download-button");

  for (const card of cardsList) {
    await sleep(3);

    try {
      const prompt = `Uma ilustração altamente detalhada e dinâmica de um ${card.name} - ${card.description}. A imagem deve ter texturas intrincadas e uma estética de fantasia ou ficção científica. A imagem deve estar isolada em um fundo totalmente branco. Iluminação dramática, cores vívidas e um senso de movimento ou poder devem ser enfatizados.`;

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

      await sleep(3);

      renameAndMoveFile("public/images/new-images", "public/images/renamed-images", card.name, '.jpeg')
    } catch (error) {
      console.log(`\n\nERROR ON CARD ${card.name}`);
    }
  }
}
