import puppeteer from "puppeteer";
import {
  HSBC_VALUATION_URL,
  SCREENSHOT_WIDTH,
  SCREENSHOT_HEIGHT,
  SCREENSHOT_SCROLL_X,
  SCREENSHOT_SCROLL_Y,
} from "../constant/constants.js";

const clickElement = async (elementId, page) => {
  await page.waitForSelector(elementId);
  const element = await page.$(elementId);
  await element.focus();
  await element.evaluate(b => b.click());
  //   await page.evaluate((e) => {
  //   e.setAttribute("aria-expanded", "true");
  //   e.setAttribute("class", "selectize-input items not-full invalid has-options dropdown-active focus input-active")
  // }, element);

  //   const elementInfo = await page.evaluate((el) => {
  //   return {
  //     tagName: el.tagName,
  //     textContent: el.textContent,
  //     attributes: Array.from(el.attributes).map((attr) => ({
  //       name: attr.name,
  //       value: attr.value,
  //     })),
  //   };
  // }, element);

  // console.log(elementInfo);
}

const fillInnerHtml = async (elementId, page, text) => {
  await page.waitForSelector(elementId);
  const element = await page.$(elementId);
  await page.evaluate((e, t) => {
    e.innerHTML = t;
    e.setAttribute("aria-hidden", "false");
    e.setAttribute("class", "");
    e.setAttribute("data-value", t);
    e.setAttribute("value", t);
  }, element, text);

  const elementInfo = await page.evaluate((el) => {
    return {
      tagName: el.tagName,
      textContent: el.textContent,
      attributes: Array.from(el.attributes).map((attr) => ({
        name: attr.name,
        value: attr.value,
      })),
    };
  }, element);

  console.log(elementInfo);
}

export const captureValuationImage = async () => {

  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(HSBC_VALUATION_URL);

  // Set screen size.
  await page.setViewport({
    width: SCREENSHOT_WIDTH,
    height: SCREENSHOT_HEIGHT,
  });

  await page.evaluate(
    ({ x, y }) => {
      window.scrollBy(x, y);
    },
    { x: SCREENSHOT_SCROLL_X, y: SCREENSHOT_SCROLL_Y },
  );

  const zoneForm = "#tools_form_9";
  const zoneFormMenu = '#tools_form_9_menu';

  const zoneFormSelectized = '#tools_form_9_selectized';
  const zoneFormOption = '#tools_form_9 > option';
  const zoneFormSelectizedDiv = '#tools_form_9_selectized > div';
  const zoneFormSelectedText = '#tools_form_9_selected_text';

  const areaFormSelectized = '#tools_form_10_selectized';
  const areaFormOption = '#tools_form_10 > option';
  const areaFormSelectizedDiv = '#tools_form_10_selectized > div';
  const areaFormSelectedText = '#tools_form_10_selected_text';

  const estateFormSelectized = '#tools_form_11_selectized';
  const estateFormOption = '#tools_form_11 > option';
  const estateFormSelectizedDiv = '#tools_form_11_selectized > div';
  const estateFormSelectedText = '#tools_form_11_selected_text';

  const buildingFormSelectized = '#tools_form_12_selectized';
  const buildingFormOption = '#tools_form_12 > option';
  const buildingFormSelectizedDiv = '#tools_form_12_selectized > div';
  const buildingFormSelectedText = '#tools_form_12_selected_text';

  const floorFormSelectized = '#tools_form_13_selectized';
  const floorFormOption = '#tools_form_13 > option';
  const floorFormSelectizedDiv = '#tools_form_13_selectized > div';
  const floorFormSelectedText = '#tools_form_13_selected_text';

  const roomFormSelectized = '#tools_form_14_selectized';
  const roomFormOption = '#tools_form_14 > option';
  const roomFormSelectizedDiv = '#tools_form_14_selectized > div';
  const roomFormSelectedText = '#tools_form_14_selected_text';

  // await clickElement(zoneFormMenu, page);

  // await page.waitForSelector(zoneFormOption);
  // const zoneFormOptionElement = await page.$(zoneFormOption);
  // await page.evaluate((e) => {
  //   e.setAttribute("value", "2");
  //   e.innerHTML = "九龍";
  // }, zoneFormOptionElement);

  // await page.waitForSelector(zoneFormSelectizedDiv);
  // const zoneFormSelectizedDivElement = await page.$(zoneFormSelectizedDiv);
  // await page.evaluate((e) => {
  //   e.setAttribute("data-value", "2");
  //   e.innerHTML = "九龍";
  // }, zoneFormSelectizedDivElement);


  // await page.waitForSelector(zoneFormSelectedText);
  // const zoneFormSelectedTextElement = await page.$(zoneFormSelectedText);
  // await page.evaluate((e) => {
  //   e.innerHTML = "新界/離島";
  // }, zoneFormSelectedTextElement);

  // await clickElement(zoneFormSelectized, page);
  // await clickElement(zoneForm, page);

  // const bb = await page.$('#tools_form_9_selectized');
  // await bb.evaluate(b => b.click())


  // await zoneSelect.focus();
  // await zoneSelect.type("香港")
  // zoneSelect.click()

  // const elementInfo = await page.evaluate((el) => {
  //   return {
  //     tagName: el.tagName,
  //     textContent: el.textContent,
  //     attributes: Array.from(el.attributes).map((attr) => ({
  //       name: attr.name,
  //       value: attr.value,
  //     })),
  //   };
  // }, zoneFormOptionElement);

  // console.log(elementInfo);

  // zoneSelect.evaluate(b => b.click())

  // await buttonClick.evaluate((b) => b.click());

  // Locate the option you want to select
  // const selectedOption = await page.$('#tools_form_9 option[value="1"]');

  // Click on the selected option

  // await selectedOption.evaluate(b => b.click());
  // await buttonClick.evaluate(b => b.click());

  // await page.select('#tools_form_9', "1");

  await fillInnerHtml(zoneFormSelectedText, page, "新界/離島");
  await fillInnerHtml(areaFormSelectedText, page, "馬鞍山");
  await fillInnerHtml(estateFormSelectedText, page, "雅典居");
  await fillInnerHtml(buildingFormSelectedText, page, "第3 座");
  await fillInnerHtml(floorFormSelectedText, page, "5");
  await fillInnerHtml(roomFormSelectedText, page, "D");

  await fillInnerHtml(zoneFormOption, page, "新界/離島");
  await fillInnerHtml(areaFormOption, page, "馬鞍山");
  await fillInnerHtml(estateFormOption, page, "雅典居");
  await fillInnerHtml(buildingFormOption, page, "第3 座");
  await fillInnerHtml(floorFormOption, page, "5");
  await fillInnerHtml(roomFormOption, page, "D");

  await fillInnerHtml(zoneFormSelectizedDiv, page, "新界/離島");
  await fillInnerHtml(areaFormSelectizedDiv, page, "馬鞍山");
  await fillInnerHtml(estateFormSelectizedDiv, page, "雅典居");
  await fillInnerHtml(buildingFormSelectizedDiv, page, "第3 座");
  await fillInnerHtml(floorFormSelectizedDiv, page, "5");
  await fillInnerHtml(roomFormSelectizedDiv, page, "D");

  await fillInnerHtml(zoneFormSelectized, page, "新界/離島");
  await fillInnerHtml(areaFormSelectized, page, "馬鞍山");
  await fillInnerHtml(estateFormSelectized, page, "雅典居");
  await fillInnerHtml(buildingFormSelectized, page, "第3 座");
  await fillInnerHtml(floorFormSelectized, page, "5");
  await fillInnerHtml(roomFormSelectized, page, "D");

  const submitButton = await page.$('a.search-button');
  await page.evaluate((e) => {
    e.setAttribute("aria-disabled", "false");
    e.setAttribute("class", "A-BTNP-RW-ALL search-button")
  }, submitButton);
  // await submitButton.click();
  await submitButton.evaluate(b => b.click())

  await new Promise(resolve => setTimeout(resolve, 5000)); // 3 sec

  // await page.waitForNavigation({ waitUntil: "domcontentloaded" });

  await page.screenshot({ path: "./out/example.png" });

  await browser.close();
};
