import { JSDOM } from "jsdom";

export async function runExtraChecks(url: string) {
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  const dom = new JSDOM(html);
  const d = dom.window.document;

  const get = (sel) => d.querySelector(sel);
  const title = (get("title")?.textContent || "").trim();
  const metaDesc = get('meta[name="description"]')?.getAttribute("content") || "";
  const h1s = [...d.querySelectorAll("h1")];
  const canonical = get('link[rel="canonical"]')?.href || "";
  const og = !!get('meta[property^="og:"]');
  const twitter = !!get('meta[name^="twitter:"]');
  const viewport = !!get('meta[name="viewport"]');
  const imgs = [...d.querySelectorAll("img")];
  const altPct = imgs.length ? Math.round(100 * imgs.filter(i => i.getAttribute("alt"))?.length / imgs.length) : 100;
  const hasAuthor = !!(d.querySelector('[rel="author"], .author, .byline'));
  const hasAbout = !!d.querySelector('a[href*="about"]');
  const hasContact = !!d.querySelector('a[href*="contact"]');
  const napText = /(\(\d{3}\)\s*\d{3}-\d{4}|\d{3}[-.\s]\d{3}[-.\s]\d{4})/i.test(d.body.textContent || "");

  // quick reachability checks
  const robots = await fetch(new URL("/robots.txt", url)).then(r=>r.ok).catch(()=>false);
  const sitemap = await fetch(new URL("/sitemap.xml", url)).then(r=>r.ok).catch(()=>false);

  return {
    onPage: { title, metaDesc, h1Count: h1s.length, canonical, og, twitter, viewport, altPct },
    directives: { robots, sitemap },
    eeat: { hasAuthor, hasAbout, hasContact },
    local: { napText }
  };
}
