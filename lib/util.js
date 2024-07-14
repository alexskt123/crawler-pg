export const getSpanText = async (page, spanSelectorIdentifier) => {
  const spanSelector = await page.waitForSelector(spanSelectorIdentifier);
  const SpanText = await page.evaluate(
    (element) => element.textContent,
    spanSelector,
  );
  return SpanText?.trim().replaceAll(/[\(\)]/g, "");
};
