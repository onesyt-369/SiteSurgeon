import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function auditUrl(url: string) {
  // Use PSI API directly in Replit environment
  const key = process.env.GOOGLE_PSI_API_KEY;
  if (key) {
    try {
      const r = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=SEO&category=BEST_PRACTICES&category=ACCESSIBILITY&strategy=MOBILE&key=${key}`);
      const result = await r.json();
      return result.lighthouseResult || result;
    } catch (err) {
      console.error('PSI API error:', err);
      throw err;
    }
  }
  
  // Fallback to local Chrome if PSI fails
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
    console.error('Chrome launch error:', err);
    throw new Error('Both PSI API and local Chrome failed');
  }
}
