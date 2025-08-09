# 🚀 SiteSurgeon Railway Deployment Guide

## Step 1: Push to GitHub
```bash
git push origin main
```

## Step 2: Deploy on Railway
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select `SiteSurgeon` repository
4. Railway will start deployment

## Step 3: Set Environment Variables
In Railway → Settings → Variables, add:

```
GOOGLE_PSI_API_KEY=<your-key-here>
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/pQEoIjSHbKGdVObcZ8VS/webhook-trigger/d99fb678-8c72-4248-a0b1-1e4881e5fc9d
FORCE_PSI=1
NODE_ENV=production
NIXPACKS_PKGS=chromium
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

## Step 4: Get Your URL
After deployment, Railway will give you a URL like:
`https://sitesurgeon-production.up.railway.app`

Add this as another variable:
```
BASE_URL=https://sitesurgeon-production.up.railway.app
```

Then redeploy.

## Step 5: Test Your Deployment

### Health Check:
```bash
curl https://sitesurgeon-production.up.railway.app/api/health
```

### Full Audit Test:
```bash
curl -X POST https://sitesurgeon-production.up.railway.app/api/audit \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hugemouthseo.com/486--seo",
    "email": "onesystemnow@gmail.com",
    "name": "Test User"
  }'
```

## Expected Results:
- Health check: `{"status":"ok"}`
- Audit response with:
  - `overallScore`: 0-100
  - `reportUrlHTML`: Link to HTML report
  - `reportUrlPDF`: Link to PDF report
  - `screenshotUrl`: Mobile screenshot
- GoHighLevel webhook: Should receive 200 OK

## Troubleshooting:
- If Puppeteer fails: Check NIXPACKS_PKGS and PUPPETEER_EXECUTABLE_PATH
- If PSI fails: Verify GOOGLE_PSI_API_KEY has quota
- If webhook fails: Check GHL_WEBHOOK_URL is correct