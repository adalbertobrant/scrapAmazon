const puppeteer = require("puppeteer");

let browser;

const initializePuppeteer = async () => {
  try {
      browser = await puppeteer.launch();
      return await browser.newPage();
  } catch (err) {
    throw err;
  }
};

const closePuppeteer = async () => await browser.close();

const scrapeProducts = async (QUERY_TO_SEARCH) => {
  try {
    const page = await initializePuppeteer();
    await page.goto("https://www.amazon.com/");
    await page.type("#twotabsearchtextbox", QUERY_TO_SEARCH);
    await page.click("#nav-search-submit-button");
    await page.waitForNavigation();
	await page.waitForTimeout(5000);
    const products = await page.evaluate(() => {
      let results = [];
      const items = document.querySelectorAll(".s-result-item .sg-col-inner");
      for (let i = items.length; i--; ) {
        const item = items[i];
        const title = item.querySelector("h2 > a > span");
        const price = item.querySelector(".a-price-whole");
        const cents = item.querySelector(".a-price-fraction");
        const image = item.querySelector("img");
        const ratings = item.querySelector(".a-icon-alt");
        const reviews = item.querySelector("span[aria-label] > a > span");
        if (!title || !price || !image || !ratings || !reviews) continue;
        results = [...results, {
          title: title.innerText,
          price: !cents?.innerText.length ? parseInt(price.innerText) : parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),
          image: image.getAttribute("src"),
          ratings: ratings.innerText,
          reviews: reviews.innerText
        }]
      }
      return results;
    });
    await closePuppeteer();
	return products;
  } catch (err) {
    throw err;
  }
}
module.exports = {
  scrapeAmazon: scrapeProducts
};
