import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { minify } from "html-minifier-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function renderAndSave({ id, url, lh, extra, scored, brand, baseUrl }: { 
  id: string; 
  url: string; 
  lh: any; 
  extra: any; 
  scored: any; 
  brand: string; 
  baseUrl?: string 
}) {
  const outDir = path.join(__dirname, "..", "reports", id);
  await fs.mkdir(outDir, { recursive: true });

  const tpl = await fs.readFile(path.join(__dirname, "..", "templates", "report.html"), "utf8");
  const htmlRaw = tpl
    .replaceAll("{{BRAND}}", brand)
    .replaceAll("{{URL}}", url)
    .replaceAll("{{SCORE}}", String(scored.scores.overall))
    .replaceAll("{{TOPFIXES_JSON}}", JSON.stringify(scored.topFixes, null, 2))
    .replaceAll("{{SCORES_JSON}}", JSON.stringify(scored.scores, null, 2));
  const html = await minify(htmlRaw, { collapseWhitespace: true, minifyCSS: true, minifyJS: true });

  const htmlPath = path.join(outDir, "report.html");
  await fs.writeFile(htmlPath, html, "utf8");

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfPath = path.join(outDir, "report.pdf");
  await page.pdf({ path: pdfPath, format: "A4", printBackground: true });
  const pngPath = path.join(outDir, "mobile.png");
  await page.screenshot({ path: pngPath, fullPage: true });
  await browser.close();

  const base = process.env.BASE_URL?.replace(/\/$/, "") || "";
  return {
    reportHtmlUrl: `${base}/reports/${id}/report.html`,
    reportPdfUrl: `${base}/reports/${id}/report.pdf`,
    screenshotUrl: `${base}/reports/${id}/mobile.png`,
    finalUrl: url
  };
}
