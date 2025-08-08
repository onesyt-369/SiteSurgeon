import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export async function auditUrl(url: string) {
  console.log(`Starting audit for ${url}`);
  
  if (process.env.FORCE_PSI === "1") {
    console.log('FORCE_PSI=1, using PSI directly');
    return runPSI(url);
  }
  
  console.log('Attempting local Chrome first...');
  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless", "--no-sandbox"]
    });
    console.log(`Chrome launched on port ${chrome.port}`);
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false }
    }, { onlyCategories: ["performance","seo","best-practices","accessibility"] });
    await chrome.kill();
    console.log('Local Chrome audit completed successfully');
    return JSON.parse(result.report);
  } catch (error) {
    console.log('Local Chrome failed, falling back to PSI:', error.message);
    return runPSI(url);
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
