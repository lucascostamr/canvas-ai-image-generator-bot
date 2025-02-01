export async function paste(page) {
  await page.keyboard.down("Control");
  await page.keyboard.press("V");
  await page.keyboard.up("Control");
}

export async function tab(page, times) {
  for (let i = 0; i < times; i++) {
    await page.keyboard.press("Tab");
  }
}

export async function selectAll(page) {
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
}