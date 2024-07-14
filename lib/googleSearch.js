import puppeteer from "puppeteer";
import { GOOGLE_SEARCH_URL } from "../constant/constants.js";

export const captureSearchedImage = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(GOOGLE_SEARCH_URL);

  const element = "#APjFqb";
  const searchTextArea = await page.waitForSelector(element);
  await searchTextArea.type("AAPL");
  await searchTextArea.press("Enter");

  // Wait for the page to reach network idle state
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  const currentTimestamp = new Date().getTime();
  await page.screenshot({
    path: `./out/google-search-${currentTimestamp}.png`,
  });

  await browser.close();
};
