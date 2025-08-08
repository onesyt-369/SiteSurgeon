export async function sendToGHL(auditData: {
  url: string;
  email: string;
  name?: string;
  overallScore: number;
  scores: any;
  topFixes: any[];
  reportUrls: { html: string; pdf: string; screenshot: string };
}) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('GHL_WEBHOOK_URL not set, skipping webhook');
    return;
  }

  const payload = {
    event: "site_audit_completed",
    contact: { 
      email: auditData.email, 
      name: auditData.name || "Website Owner", 
      source: "SiteSurgeon" 
    },
    site: { url: auditData.url },
    scores: auditData.scores,
    top_fixes: auditData.topFixes,
    links: {
      report_html: auditData.reportUrls.html,
      report_pdf: auditData.reportUrls.pdf,
      screenshot_mobile: auditData.reportUrls.screenshot
    }
  };

  try {
    console.log('Sending GHL webhook:', JSON.stringify(payload, null, 2));
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    console.log('GHL webhook status:', response.status);
    try { 
      const responseText = await response.text();
      console.log('GHL webhook body:', responseText.slice(0, 200)); 
    } catch (e) {
      console.log('Could not read webhook response body');
    }
    
    if (!response.ok) {
      console.error('GHL webhook failed with status:', response.status);
    } else {
      console.log('GHL webhook sent successfully');
    }
  } catch (error) {
    console.error('GHL webhook error:', error);
  }
}
