# Site Surgeon - Website Performance Audit Tool

A comprehensive website auditing API service that combines Google Lighthouse performance testing with additional SEO and accessibility checks. Built as a full-stack TypeScript application with React frontend and Express backend, featuring GoHighLevel integration for automated lead capture.

## Features

- **🚀 Comprehensive Auditing**: Google Lighthouse integration with Core Web Vitals analysis
- **📊 Professional Reports**: HTML/PDF report generation with mobile screenshots
- **🎯 Priority-Ranked Fixes**: Impact-scored recommendations with implementation time estimates
- **🔗 CRM Integration**: GoHighLevel webhook integration for automated lead capture
- **⚡ Modern Stack**: TypeScript, React, Express, shadcn/ui components
- **🛡️ Production Ready**: Rate limiting, CORS protection, error handling

## Quick Start

### Prerequisites
- Node.js 18+
- Google PageSpeed Insights API key
- GoHighLevel webhook URL (optional)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file or set these environment variables:

```env
GOOGLE_PSI_API_KEY=your_google_psi_api_key
GHL_WEBHOOK_URL=your_ghl_webhook_url
FORCE_PSI=1
BASE_URL=https://your-domain.com
BRAND_NAME=YourBrandName
```

### Development

```bash
npm run dev
```

Runs both frontend (Vite) and backend (Express) on port 5000.

### Production Build

```bash
npm run build
npm start
```

## API Usage

### Audit Endpoint

```bash
POST /api/audit
Content-Type: application/json

{
  "url": "https://example.com",
  "email": "client@example.com",
  "name": "Client Name"
}
```

### Response

```json
{
  "id": "uuid",
  "url": "https://example.com",
  "overallScore": 77,
  "topFixes": [
    {
      "title": "Improve LCP",
      "why": "Slow LCP hurts conversions",
      "how": "Compress images, preload critical resources",
      "est_hours": 1.5,
      "score": 9
    }
  ],
  "reportUrlHTML": "/reports/uuid/report.html",
  "reportUrlPDF": "/reports/uuid/report.pdf",
  "screenshotUrl": "/reports/uuid/mobile.png",
  "scores": {
    "overall": 77,
    "lighthouse": {
      "performance": 85,
      "seo": 90,
      "bestPractices": 100,
      "accessibility": 88
    },
    "coreWebVitals": {
      "lcp_ms": 1200,
      "inp_ms": 150,
      "cls": 0.05,
      "passed": true
    }
  }
}
```

## GoHighLevel Integration

The system automatically sends webhook data to GoHighLevel when `GHL_WEBHOOK_URL` is configured:

```json
{
  "event": "site_audit_completed",
  "contact": {
    "email": "client@example.com",
    "name": "Client Name",
    "source": "SiteSurgeon"
  },
  "site": { "url": "https://example.com" },
  "scores": { "overall": 77, ... },
  "top_fixes": [...],
  "links": {
    "report_html": "https://domain.com/reports/uuid/report.html",
    "report_pdf": "https://domain.com/reports/uuid/report.pdf",
    "screenshot_mobile": "https://domain.com/reports/uuid/mobile.png"
  }
}
```

### Recommended GHL Custom Fields

Create these custom fields in GoHighLevel to capture audit data:

- **Overall Score** (number) → `scores.overall`
- **Report HTML** (text) → `links.report_html`
- **Report PDF** (text) → `links.report_pdf`
- **Screenshot Mobile** (text) → `links.screenshot_mobile`

### Sample GHL Workflow

1. **Trigger**: Incoming Webhook
2. **Action**: Find/Create Contact using `contact.email`
3. **Action**: Set Custom Fields from webhook payload
4. **Action**: Send Day-0 email with report links
5. **Condition**: If `scores.overall < 75` → Create follow-up task

## Architecture

### Frontend (`client/`)
- React 18 with TypeScript
- Wouter for routing
- shadcn/ui component library
- TanStack Query for state management
- Tailwind CSS for styling

### Backend (`server/`)
- Express.js with TypeScript
- Google Lighthouse integration
- Custom SEO/accessibility checks
- PDF/HTML report generation
- Rate limiting and CORS protection

### Shared (`shared/`)
- Zod schemas for type validation
- Drizzle ORM for database operations

## Deployment

### Replit Deployment
1. Import this repository to Replit
2. Set environment variables in Secrets
3. Deploy using Replit's deployment system

### Railway/Vercel Deployment
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with default build settings

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test audit endpoint
curl -X POST http://localhost:5000/api/audit \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","email":"test@example.com","name":"Test User"}'
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── lib/               # Audit modules
│   │   ├── lighthouse.ts  # Lighthouse integration
│   │   ├── extraChecks.ts # Custom SEO checks
│   │   ├── scoring.ts     # Fix prioritization
│   │   ├── render.ts      # Report generation
│   │   └── webhook.ts     # GHL integration
│   ├── routes.ts          # API routes
│   └── index.ts           # Server entry
├── shared/                # Shared types/schemas
└── components.json        # shadcn/ui config
```

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
1. Check the logs for error details
2. Verify environment variables are set
3. Test with the health endpoint first
4. Ensure Google PSI API key has sufficient quota

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ for digital agencies and SEO professionals.