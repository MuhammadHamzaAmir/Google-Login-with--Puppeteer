const puppeteer = require("puppeteer-extra");
// const { QueryHandler } = require("query-selector-shadow-dom/plugins/puppeteer");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

(async () => {
  var email = "Your Email"; //email used for signup and login
  var password = "Your Password"; // default password for all the accounts
  var name = "ATESTER"; //default name for all accounts

  //   await puppeteer.registerCustomQueryHandler("shadow", QueryHandler);
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
    defaultViewport: null,
    args: [
      "--start-maximized",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-web-security",
      "--disable-automation",
    ],
  });

  const context = await browser.createIncognitoBrowserContext();
  // Create a new page in a pristine context.
  var page = await context.newPage(); // a new page is created
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  //when headless=true
    // await page.setViewport({
    //   width: 1920,
    //   height: 1080,
    //   deviceScaleFactor: 1,
    // });

  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0);

  await page.goto("https://accounts.google.com/"); //mentioned site is then reached
  await page.waitForTimeout(5000); // delay for 5 second for website to load]
  await page.type("#identifierId", email, { delay: 57 });

  //mouse keyboard emulation
  // await page.mouse.click(853,449);
  // await page.waitForTimeout(1605);
  // await page.keyboard.type(email,{delay:60});
  // await page.waitForTimeout(905);
  // await page.mouse.click(1104,645);

  await page.click("#identifierNext > div > button");
  await page.waitForTimeout(5000); // delay for 5 second for website to load]

  await page.type("#password > div > div > div > input", password, {
    delay: 47,
  });

  await page.waitForTimeout(2000);
  await page.click("#passwordNext > div > button");
  await page.waitForTimeout(10000);

  await browser.close();

  console.log("test passed => 'google_signup'");
})();
