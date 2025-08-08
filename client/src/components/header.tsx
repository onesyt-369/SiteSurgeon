import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-stethoscope text-2xl text-primary"></i>
              <h1 className="text-xl font-bold text-secondary">Site Surgeon</h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">by HugemouthSEO</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#audit" className="text-gray-600 hover:text-primary transition-colors">Audit Tool</a>
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#reports" className="text-gray-600 hover:text-primary transition-colors">Sample Reports</a>
          </nav>
          <Button className="bg-primary text-white hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
