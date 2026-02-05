// scraper.js
import { Builder, By, until } from "selenium-webdriver";
import fs from "fs";
import chrome from "selenium-webdriver/chrome.js";
import config from "./config.js";


function calculateRemaining(dueDateText) {
  if (!dueDateText) return "N/A";

  const now = new Date();
  const dueDate = new Date(dueDateText);

  if (isNaN(dueDate)) return "Invalid date";

  const diffMs = dueDate - now;

  if (diffMs <= 0) {
    return "Past due"; // Assignment already expired
  }

  // Convert milliseconds to days, hours, minutes
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${days}d ${hours}h ${minutes}m remaining`;
}

async function main() {
  console.log("Starting Scraper...");

  const options = new chrome.Options();

  options.addArguments(
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--disable-extensions",
    "--disable-blink-features=AutomationControlled",
    "user-data-dir=/Users/wilson/selenium-profile-scraper"
  );

  options.setChromeBinaryPath("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Use existing Chrome profile (so you're already logged in)
  if (config.userDataDir) {
    options.addArguments(`user-data-dir=${config.userDataDir}`);
  }

  options.addArguments("--disable-blink-features=AutomationControlled");


  try {
    console.log("Launching browser...");

    const builder = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options);

    if (config.chromedriverPath) {
      const service = new chrome.ServiceBuilder(config.chromedriverPath);
      builder.setChromeService(service);
    }

    driver = await builder.build();

    console.log(`Opening: ${config.baseUrl}`);
    await driver.get(config.baseUrl);

    console.log("Waiting for assignments to load...");

    await driver.wait(async () => {
      const elems = await driver.findElements(By.css(config.selectors.assignmentItem));
      return elems.length > 0;
    }, 60000); // wait up to 60 seconds

    const assignmentElements = await driver.findElements(
      By.css(config.selectors.assignmentItem)
    );

    console.log(`Found ${assignmentElements.length} assignments`);

    const results = [];

    for (const el of assignmentElements) {
      try {
        const name = await safeGetText(el, config.selectors.name);
        const grade = await safeGetText(el, config.selectors.grade);
        const dueDateText = await safeGetText(el, config.selectors.dueDate);

        const remaining = calculateRemaining(dueDateText);

        results.push({
          name,
          grade: grade || "Not graded",
          dueDate: dueDateText,
          remaining,
        });
      } catch (itemErr) {
        console.error("Error reading assignment:", itemErr.message);
      }
    }

    fs.writeFileSync(config.outputFile, JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} assignments to ${config.outputFile}`);
  } catch (err) {
    console.error("Fatal error:", err);
  } finally {
    // await driver.quit(); // keep open for debugging
  }
}

async function safeGetText(parent, selector) {
  try {
    const el = await parent.findElement(By.css(selector));
    return await el.getText();
  } catch {
    return null;
  }
}

main();