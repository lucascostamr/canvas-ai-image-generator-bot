import clipboard from "clipboardy";

export async function imageCreator(page) {
  await page
    .locator(
      "::-p-aria([name='Choose from the list of example prompts or write your own'][role='searchbox'])"
    )
    .click();
  // const input = await page.waitForSelector(
  //   '[aria-label="Choose from the list of example prompts or write your own"]'
  // );

  // input.type("OI");
}
