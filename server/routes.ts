import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import dayjs from "dayjs";

// Import audit modules
import { auditUrl } from "./lib/lighthouse.js";
import { runExtraChecks } from "./lib/extraChecks.js";
import { scoreAndFixes } from "./lib/scoring.js";
import { renderAndSave } from "./lib/render.js";
import { sendToGHL } from "./lib/webhook.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Railway-ready CORS configuration
  const corsOptions = {
    origin: [
      'https://sitesurgeon-production.up.railway.app',
      'http://localhost:5000',
      'http://localhost:3000',
      // Add GHL domains if needed
      'https://services.leadconnectorhq.com'
    ],
    credentials: true
  };
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  
  // Serve static reports
  app.use("/reports", express.static(path.join(__dirname, "reports")));

  // Rate limiting for API endpoints
  const limiter = rateLimit({ windowMs: 60 * 1000, max: 6 });
  app.use("/api/", limiter);

  // Enhanced health check endpoint for Railway debugging
  app.get("/api/health", (_, res) => res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    service: "SiteSurgeon",
    version: "1.0.0",
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '5000',
    hasGoogleKey: !!process.env.GOOGLE_PSI_API_KEY,
    hasGHLWebhook: !!process.env.GHL_WEBHOOK_URL,
    baseUrl: process.env.BASE_URL || 'not-set'
  }));

  // Main audit endpoint
  app.post("/api/audit", async (req, res) => {
    try {
      const { url, email, name } = req.body || {};
      if (!url || !email) {
        return res.status(400).json({ error: "url and email required" });
      }

      const id = crypto.randomUUID();
      
      // Run Lighthouse audit
      const lh = await auditUrl(url);
      
      // Run extra SEO checks
      const extra = await runExtraChecks(url);
      
      // Calculate scores and fixes
      const scored = scoreAndFixes(lh, extra);

      // Generate and save reports
      const out = await renderAndSave({
        id, 
        url, 
        lh, 
        extra, 
        scored,
        brand: process.env.BRAND_NAME || "HugemouthSEO",
        baseUrl: process.env.BASE_URL
      });

      // Send GHL webhook (non-blocking)
      sendToGHL({
        url,
        email,
        name,
        overallScore: scored.scores.overall,
        scores: scored.scores,
        topFixes: scored.topFixes,
        reportUrls: {
          html: out.reportHtmlUrl,
          pdf: out.reportPdfUrl,
          screenshot: out.screenshotUrl
        }
      }).catch(() => {});

      return res.json({
        id, 
        url,
        overallScore: scored.scores.overall,
        topFixes: scored.topFixes,
        reportUrlHTML: out.reportHtmlUrl,
        reportUrlPDF: out.reportPdfUrl,
        screenshotUrl: out.screenshotUrl,
        scores: scored.scores
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "audit_failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
