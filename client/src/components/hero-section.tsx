export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl font-bold text-secondary mb-6 leading-tight">
              Diagnose Your Website's 
              <span className="text-primary"> Performance</span> Issues
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get comprehensive Lighthouse audits, SEO analysis, and actionable fixes in seconds. 
              Professional reports with Core Web Vitals, accessibility scores, and critical optimization recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#audit" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
                Start Free Audit
              </a>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Sample Report
              </button>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">Site Performance Score</h3>
                <span className="text-sm text-gray-500">Live Demo</span>
              </div>
              
              {/* Score Circle */}
              <div className="text-center mb-6">
                <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-4">
                  <span className="text-3xl font-bold text-white">87</span>
                </div>
                <p className="text-gray-600">Overall Performance</p>
              </div>
              
              {/* Mini Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">LCP</div>
                  <div className="font-semibold text-accent">2.1s</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm text-gray-500">CLS</div>
                  <div className="font-semibold text-accent">0.05</div>
                </div>
              </div>
              
              {/* Top Fix Preview */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center text-sm text-amber-800">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Critical Fix Available
                </div>
                <p className="text-sm text-amber-700 mt-1">Optimize hero image compression</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
