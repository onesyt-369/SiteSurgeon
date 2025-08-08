import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AuditResult } from "@/pages/home";

interface ResultsDashboardProps {
  result: AuditResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-amber-600";
    return "text-red-600";
  };

  const getImpactBadge = (impact: number) => {
    if (impact >= 3) return "bg-red-100 text-red-800";
    if (impact >= 2) return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };

  const getImpactLabel = (impact: number) => {
    if (impact >= 3) return "HIGH IMPACT";
    if (impact >= 2) return "MEDIUM IMPACT";
    return "LOW IMPACT";
  };

  const getCWVStatus = (metric: string, value: number) => {
    switch (metric) {
      case "lcp":
        return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
      case "inp":
        return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
      case "cls":
        return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
      default:
        return "good";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <i className="fas fa-check text-green-600 text-xl"></i>;
      case "needs-improvement":
        return <i className="fas fa-exclamation text-amber-600 text-xl"></i>;
      case "poor":
        return <i className="fas fa-times text-red-600 text-xl"></i>;
      default:
        return <i className="fas fa-check text-green-600 text-xl"></i>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100";
      case "needs-improvement":
        return "bg-amber-100";
      case "poor":
        return "bg-red-100";
      default:
        return "bg-green-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "good":
        return "Good";
      case "needs-improvement":
        return "Needs Improvement";
      case "poor":
        return "Poor";
      default:
        return "Good";
    }
  };

  return (
    <section id="results" className="py-20 bg-gray-50" data-testid="results-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Audit Results</h2>
          <p className="text-gray-600">Comprehensive analysis for <span className="font-mono text-primary" data-testid="text-url">{result.url}</span></p>
        </div>
        
        {/* Score Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Overall Score</h3>
                <i className="fas fa-chart-line text-primary"></i>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.overallScore)}`} data-testid="score-overall">
                  {result.overallScore}
                </div>
                <div className="text-sm text-gray-500">Out of 100</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Performance</h3>
                <i className="fas fa-tachometer-alt text-primary"></i>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.scores.lighthouse.performance)}`} data-testid="score-performance">
                  {result.scores.lighthouse.performance}
                </div>
                <div className="text-sm text-gray-500">Lighthouse</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">SEO</h3>
                <i className="fas fa-search text-primary"></i>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.scores.lighthouse.seo)}`} data-testid="score-seo">
                  {result.scores.lighthouse.seo}
                </div>
                <div className="text-sm text-gray-500">Score</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Accessibility</h3>
                <i className="fas fa-universal-access text-primary"></i>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.scores.lighthouse.accessibility)}`} data-testid="score-accessibility">
                  {result.scores.lighthouse.accessibility}
                </div>
                <div className="text-sm text-gray-500">A11y</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Core Web Vitals */}
        <Card className="bg-white shadow-lg border border-gray-200 mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center">
              <i className="fas fa-bolt mr-3 text-warning"></i>
              Core Web Vitals
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center ${getStatusColor(getCWVStatus("lcp", result.scores.coreWebVitals.lcp_ms))}`}>
                  {getStatusIcon(getCWVStatus("lcp", result.scores.coreWebVitals.lcp_ms))}
                </div>
                <div className="font-semibold text-gray-900">LCP</div>
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(result.scores.coreWebVitals.lcp_ms <= 2500 ? 90 : 50)}`} data-testid="cwv-lcp">
                  {result.scores.coreWebVitals.lcp_ms}ms
                </div>
                <div className="text-sm text-gray-500">{getStatusText(getCWVStatus("lcp", result.scores.coreWebVitals.lcp_ms))} (&lt; 2.5s)</div>
              </div>
              
              <div className="text-center">
                <div className={`rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center ${getStatusColor(getCWVStatus("inp", result.scores.coreWebVitals.inp_ms))}`}>
                  {getStatusIcon(getCWVStatus("inp", result.scores.coreWebVitals.inp_ms))}
                </div>
                <div className="font-semibold text-gray-900">INP</div>
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(result.scores.coreWebVitals.inp_ms <= 200 ? 90 : 50)}`} data-testid="cwv-inp">
                  {result.scores.coreWebVitals.inp_ms}ms
                </div>
                <div className="text-sm text-gray-500">{getStatusText(getCWVStatus("inp", result.scores.coreWebVitals.inp_ms))}</div>
              </div>
              
              <div className="text-center">
                <div className={`rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center ${getStatusColor(getCWVStatus("cls", result.scores.coreWebVitals.cls))}`}>
                  {getStatusIcon(getCWVStatus("cls", result.scores.coreWebVitals.cls))}
                </div>
                <div className="font-semibold text-gray-900">CLS</div>
                <div className={`text-2xl font-bold mb-1 ${getScoreColor(result.scores.coreWebVitals.cls <= 0.1 ? 90 : 50)}`} data-testid="cwv-cls">
                  {result.scores.coreWebVitals.cls}
                </div>
                <div className="text-sm text-gray-500">{getStatusText(getCWVStatus("cls", result.scores.coreWebVitals.cls))} (&lt; 0.1)</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Critical Fixes */}
        <Card className="bg-white shadow-lg border border-gray-200 mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center">
              <i className="fas fa-wrench mr-3 text-danger"></i>
              3 Critical Fixes
            </h3>
            
            <div className="space-y-4">
              {result.topFixes.map((fix, index) => (
                <div key={fix.id} className={`border rounded-lg p-6 ${
                  fix.impact >= 3 ? 'border-red-200 bg-red-50' :
                  fix.impact >= 2 ? 'border-amber-200 bg-amber-50' :
                  'border-blue-200 bg-blue-50'
                }`} data-testid={`fix-${index}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full mr-3 ${getImpactBadge(fix.impact)}`}>
                        {getImpactLabel(fix.impact)}
                      </span>
                      <h4 className="font-semibold text-gray-900" data-testid={`fix-title-${index}`}>{fix.title}</h4>
                    </div>
                    <span className="text-sm text-gray-500" data-testid={`fix-hours-${index}`}>{fix.est_hours}h</span>
                  </div>
                  <p className="text-gray-700 mb-3" data-testid={`fix-why-${index}`}>{fix.why}</p>
                  <p className="text-sm text-gray-600" data-testid={`fix-how-${index}`}>{fix.how}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Report Downloads */}
        <Card className="bg-white shadow-lg border border-gray-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center">
              <i className="fas fa-download mr-3 text-primary"></i>
              Download Reports
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href={result.reportUrlHTML} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
                data-testid="link-html-report"
              >
                <div className="text-center">
                  <i className="fas fa-file-code text-3xl text-blue-600 mb-3"></i>
                  <h4 className="font-semibold text-gray-900 mb-2">HTML Report</h4>
                  <p className="text-sm text-gray-600">Interactive web version</p>
                </div>
              </a>
              
              <a 
                href={result.reportUrlPDF} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
                data-testid="link-pdf-report"
              >
                <div className="text-center">
                  <i className="fas fa-file-pdf text-3xl text-red-600 mb-3"></i>
                  <h4 className="font-semibold text-gray-900 mb-2">PDF Report</h4>
                  <p className="text-sm text-gray-600">Printable document</p>
                </div>
              </a>
              
              <a 
                href={result.screenshotUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors block"
                data-testid="link-screenshot"
              >
                <div className="text-center">
                  <i className="fas fa-image text-3xl text-green-600 mb-3"></i>
                  <h4 className="font-semibold text-gray-900 mb-2">Mobile Screenshot</h4>
                  <p className="text-sm text-gray-600">Visual preview</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
