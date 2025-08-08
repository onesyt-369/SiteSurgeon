import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AuditForm from "@/components/audit-form";
import ResultsDashboard from "@/components/results-dashboard";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { useState } from "react";

export interface AuditResult {
  id: string;
  url: string;
  overallScore: number;
  topFixes: Array<{
    id: string;
    impact: number;
    confidence: number;
    title: string;
    why: string;
    how: string;
    est_hours: number;
  }>;
  reportUrlHTML: string;
  reportUrlPDF: string;
  screenshotUrl: string;
  scores: {
    overall: number;
    lighthouse: {
      performance: number;
      seo: number;
      bestPractices: number;
      accessibility: number;
    };
    coreWebVitals: {
      lcp_ms: number;
      inp_ms: number;
      cls: number;
      passed: boolean;
    };
    checklists: {
      onPage_passed: number;
      onPage_total: number;
      tech_passed: number;
      tech_total: number;
      eeat_passed: number;
      eeat_total: number;
    };
  };
}

export default function Home() {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <AuditForm onResult={setAuditResult} />
      {auditResult && <ResultsDashboard result={auditResult} />}
      <FeaturesSection />
      
      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-secondary mb-4">Trusted by SEO Professionals</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Audits Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Accuracy Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">60s</div>
              <div className="text-gray-600">Average Report Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report Section */}
      <section id="reports" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">Professional Report Examples</h2>
            <p className="text-gray-600 text-lg">See what your audit reports will look like</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" alt="Sample audit report dashboard" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-3">HTML Interactive Report</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive web-based report with interactive charts, detailed metrics, 
                  and clickable recommendations. Perfect for sharing with clients and team members.
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-primary font-medium hover:text-blue-700 transition-colors">
                    View Sample HTML Report →
                  </button>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Interactive</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://pixabay.com/get/gfc871d94e5dfebc23f0440ae75393d367eca03a9682343c7e7c1eac69d51d9efdd8eb431bbb40f0de76b96cf8d1a828c35a88c56268885dba24fbced20a9881f_1280.jpg" alt="PDF report document layout" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-3">PDF Professional Report</h3>
                <p className="text-gray-600 mb-4">
                  Print-ready PDF version with executive summary, detailed findings, 
                  and implementation roadmap. Ideal for presentations and documentation.
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-primary font-medium hover:text-blue-700 transition-colors">
                    View Sample PDF Report →
                  </button>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Optimize Your Website Performance?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your comprehensive website audit report in under 60 seconds. 
            No signup required, just instant actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#audit" className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free Audit Now
            </a>
            <button className="border border-blue-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
