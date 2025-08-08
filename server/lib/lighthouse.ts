import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function auditUrl(url: string) {
  if (process.env.FORCE_PSI === "1") return runPSI(url);
  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--no-sandbox"]
    });
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false }
    }, { onlyCategories: ["performance","seo","best-practices","accessibility"] });
    await chrome.kill();
    return JSON.parse(result.report);
  } catch {
    return runPSI(url); // fallback
  }
}

async function runPSI(url: string) {
  const key = process.env.GOOGLE_PSI_API_KEY;
  if (!key) throw new Error("GOOGLE_PSI_API_KEY missing");
  const resp = await fetch(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
    + `?url=${encodeURIComponent(url)}`
    + "&category=PERFORMANCE&category=SEO&category=BEST_PRACTICES&category=ACCESSIBILITY"
    + "&strategy=MOBILE&locale=en&prettyPrint=false"
    + `&key=${key}`
  );
  const json = await resp.json();
  if (!json.lighthouseResult) throw new Error("PSI: no lighthouseResult");
  return json.lighthouseResult; // same shape our scoring expects
}
