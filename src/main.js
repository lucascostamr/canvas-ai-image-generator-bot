import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { loginGoogle, loginCanvasWithGoogle } from "./services/login.js";

const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

puppeteer.use(StealthPlugin());

const browser = await puppeteer.launch({
  headless: false,
  protocolTimeout: 60000,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-features=SameSiteByDefaultCookies",
    "--disable-features=CookiesWithoutSameSiteMustBeSecure",
    "--window-size=1280,800",
  ],
  userAgent: userAgent,
});

const pages = await browser.pages();

const currentPage = pages.shift()

await loginGoogle(currentPage)

await currentPage.waitForNetworkIdle();

await loginCanvasWithGoogle(currentPage, browser)