import puppeteer from 'puppeteer';
import { HSBC_VALUATION_URL, SCREENSHOT_WIDTH, SCREENSHOT_HEIGHT, SCREENSHOT_SCROLL_X, SCREENSHOT_SCROLL_Y } from '../constant/constants.js';

export const captureValuationImage = async () => {
    console.log(SCREENSHOT_SCROLL_X, SCREENSHOT_SCROLL_Y)
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(HSBC_VALUATION_URL);

    // Set screen size.
    await page.setViewport({ width: SCREENSHOT_WIDTH, height: SCREENSHOT_HEIGHT });

    await page.evaluate(({ x, y }) => {
        window.scrollBy(x, y);
    }, { x: SCREENSHOT_SCROLL_X, y: SCREENSHOT_SCROLL_Y });

    const element = "#tools_form_9";

    await page.waitForSelector(element);
    const buttonClick = await page.$(element);

    await buttonClick.evaluate(b => b.click());

    // Locate the option you want to select
    // const selectedOption = await page.$('#tools_form_9 option[value="1"]');

    // Click on the selected option

    // await selectedOption.evaluate(b => b.click());
    // await buttonClick.evaluate(b => b.click());

    // await page.select('#tools_form_9', "1");

    await page.screenshot({ path: './out/example.png' });

    await browser.close();
}
