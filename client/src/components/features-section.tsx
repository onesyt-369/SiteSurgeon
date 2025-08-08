export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-secondary mb-4">Comprehensive Website Analysis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our advanced audit engine combines Google Lighthouse with additional SEO and accessibility checks 
            to give you the complete picture of your website's performance.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-tachometer-alt text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Performance Audit</h3>
            <p className="text-gray-600">
              Lighthouse-powered performance testing with Core Web Vitals analysis, 
              including LCP, INP, and CLS measurements for mobile devices.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-search text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">SEO Analysis</h3>
            <p className="text-gray-600">
              Complete on-page SEO review including meta tags, headings, 
              social media tags, and technical SEO directives.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-universal-access text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Accessibility Check</h3>
            <p className="text-gray-600">
              WCAG compliance testing with image alt-text analysis 
              and accessibility best practices evaluation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-shield-alt text-2xl text-amber-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">E-E-A-T Signals</h3>
            <p className="text-gray-600">
              Experience, Expertise, Authoritativeness, and Trust evaluation 
              with author information and about page detection.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-map-marker-alt text-2xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Local SEO</h3>
            <p className="text-gray-600">
              NAP (Name, Address, Phone) detection and local business 
              optimization recommendations for better local search visibility.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-file-alt text-2xl text-indigo-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-4">Professional Reports</h3>
            <p className="text-gray-600">
              Beautiful HTML and PDF reports with actionable insights, 
              mobile screenshots, and priority-ranked fix recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
