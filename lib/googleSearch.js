import puppeteer from "puppeteer";
import { GOOGLE_SEARCH_URL } from "../constant/constants.js";

const getSpanText = async (page, spanSelectorIdentifier) => {
  const spanSelector = await page.waitForSelector(spanSelectorIdentifier);
  const SpanText = await page.evaluate(
    (element) => element.textContent,
    spanSelector,
  );
  return SpanText;
};

export const captureSearchedImage = async (stock) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(GOOGLE_SEARCH_URL);

  const element = "#APjFqb";
  const searchTextArea = await page.waitForSelector(element);
  await searchTextArea.type(stock);
  await searchTextArea.press("Enter");

  // Wait for the page to reach network idle state
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  const priceText = await getSpanText(
    page,
    "#knowledge-finance-wholepage__entity-summary > div.aviV4d > g-card-section > div > g-card-section > div.wGt0Bc > div.PZPZlf > span:nth-child(1) > span > span.IsqQVc.NprOob.wT3VGc",
  );
  const priceChangeText = await getSpanText(
    page,
    "#knowledge-finance-wholepage__entity-summary > div.aviV4d > g-card-section > div > g-card-section > div.wGt0Bc > div.PZPZlf > span.WlRRw.IsqQVc > span:nth-child(1)",
  );
  const priceChangePercentageText = await getSpanText(
    page,
    "#knowledge-finance-wholepage__entity-summary > div.aviV4d > g-card-section > div > g-card-section > div.wGt0Bc > div.PZPZlf > span.WlRRw.IsqQVc > span.jBBUv > span:nth-child(1)",
  );
  console.log(priceText, priceChangeText, priceChangePercentageText);

  const currentTimestamp = new Date().getTime();
  await page.screenshot({
    path: `./out/${stock}-search-${currentTimestamp}.png`,
  });

  await browser.close();
};
