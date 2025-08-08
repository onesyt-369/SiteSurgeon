export function scoreAndFixes(lh: any, extra: any) {
  // Pull Lighthouse-like scores (0-100). Handle PSI fallback shape if needed.
  const cat = lh.categories || {};
  const perf = Math.round(((cat.performance?.score || 0) * 100));
  const seo = Math.round(((cat.seo?.score || 0) * 100));
  const bp  = Math.round(((cat["best-practices"]?.score || 0) * 100));
  const acc = Math.round(((cat.accessibility?.score || 0) * 100));

  // Core Web Vitals — use audit details if available
  const audits = lh.audits || {};
  const LCP = audits["largest-contentful-paint"]?.numericValue || 0;   // ms
  const INP = audits["interactive"]?.numericValue || audits["experimental-interaction-to-next-paint"]?.numericValue || 0;
  const CLS = audits["cumulative-layout-shift"]?.numericValue || 0;

  let cwv = 100;
  if (LCP > 2500) cwv -= 30;
  if (INP > 200)  cwv -= 30;
  if (CLS > 0.1)  cwv -= 40;
  cwv = Math.max(0, cwv);

  // Checklists
  const onPageTotal = 7;
  let onPagePassed = 0;
  const on = extra.onPage;
  if (on.title && on.title.length <= 60) onPagePassed++;
  if (on.metaDesc && on.metaDesc.length <= 160) onPagePassed++;
  if (on.h1Count === 1) onPagePassed++;
  if (on.og) onPagePassed++;
  if (on.twitter) onPagePassed++;
  if (on.viewport) onPagePassed++;
  if (on.altPct >= 80) onPagePassed++;

  const techTotal = 4;
  let techPassed = 0;
  if (extra.directives.robots) techPassed++;
  if (extra.directives.sitemap) techPassed++;
  // naive canonical/https signals via LH audits if available
  if (perf > 0) techPassed++;
  if (seo  > 0) techPassed++;

  const eeatTotal = 3;
  let eeatPassed = 0;
  if (extra.eeat.hasAuthor) eeatPassed++;
  if (extra.eeat.hasAbout) eeatPassed++;
  if (extra.eeat.hasContact) eeatPassed++;

  const overall =
    0.35*perf + 0.20*seo + 0.15*cwv +
    0.15*(onPagePassed/onPageTotal*100) +
    0.10*(techPassed/techTotal*100) +
    0.05*(eeatPassed/eeatTotal*100);

  // Build findings and pick top 3 by impact*confidence
  const findings = [];
  if (LCP > 2500) findings.push({ id:"cwv_lcp", impact:3, confidence:3, title:"Improve LCP (hero too heavy)", why:"Slow LCP hurts conversions & visibility.", how:"Compress hero to AVIF/WebP; preload; set width/height.", est_hours:1.5 });
  if (INP > 200)  findings.push({ id:"cwv_inp", impact:3, confidence:2, title:"Reduce INP (main-thread busy)", why:"Poor interactivity hurts UX.", how:"Code-split; defer non-critical JS; remove heavy libs.", est_hours:2 });
  if (CLS > 0.1)  findings.push({ id:"cwv_cls", impact:3, confidence:3, title:"Fix layout shift (CLS)", why:"Layout jumps frustrate users.", how:"Reserve space for images/ads; set dimensions.", est_hours:0.8 });
  if (!on.metaDesc) findings.push({ id:"meta_description", impact:2, confidence:3, title:"Add meta description", why:"Boost SERP CTR.", how:"Write 140–160 chars incl. primary intent + CTA.", est_hours:0.3 });
  if (on.h1Count !== 1) findings.push({ id:"h1_count", impact:2, confidence:2, title:"Ensure exactly one H1", why:"Clear topical focus.", how:"One H1; use H2/H3 for structure.", est_hours:0.3 });
  if (extra.eeat.hasAbout === false) findings.push({ id:"about_page", impact:1, confidence:2, title:"Add/About page", why:"Trust/E-E-A-T signal.", how:"Publish About with credentials & address.", est_hours:0.5 });
  if (extra.local.napText === false) findings.push({ id:"local_nap", impact:2, confidence:2, title:"Add NAP", why:"Local relevance.", how:"Place Name/Address/Phone in footer & schema.", est_hours:0.5 });

  const topFixes = findings
    .map(f => ({ ...f, score: f.impact * f.confidence }))
    .sort((a,b) => b.score - a.score)
    .slice(0,3);

  return {
    topFixes,
    scores: {
      overall: Math.round(overall),
      lighthouse: { performance: perf, seo, bestPractices: bp, accessibility: acc },
      coreWebVitals: { lcp_ms: Math.round(LCP), inp_ms: Math.round(INP), cls: CLS, passed: (LCP<=2500 && INP<=200 && CLS<=0.1) },
      checklists: {
        onPage_passed: onPagePassed, onPage_total: onPageTotal,
        tech_passed: techPassed, tech_total: techTotal,
        eeat_passed: eeatPassed, eeat_total: eeatTotal
      }
    }
  };
}
