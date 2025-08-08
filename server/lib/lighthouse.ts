import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function auditUrl(url: string) {
  try {
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox"] });
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false }
    }, { onlyCategories: ["performance","seo","best-practices","accessibility"] });
    await chrome.kill();
    return JSON.parse(result.report);
  } catch (err) {
    // Optional: fallback to PSI API if key present
    const key = process.env.GOOGLE_PSI_API_KEY;
    if (!key) throw err;
    const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=SEO&category=BEST_PRACTICES&strategy=MOBILE&key=${key}`);
    const result = await r.json();
    return result.lighthouseResult || result;
  }
}
