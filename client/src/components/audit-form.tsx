import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { runAudit } from "@/lib/api";
import type { AuditResult } from "@/pages/home";

interface AuditFormProps {
  onResult: (result: AuditResult) => void;
}

export default function AuditForm({ onResult }: AuditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    email: "",
    name: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url || !formData.email) {
      toast({
        title: "Missing required fields",
        description: "Please enter both URL and email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await runAudit(formData);
      onResult(result);
      
      // Scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      toast({
        title: "Audit completed!",
        description: "Your website audit is ready to view below."
      });
    } catch (error) {
      console.error('Audit failed:', error);
      toast({
        title: "Audit failed",
        description: "There was an error running your audit. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="audit" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">Free Website Audit</h2>
          <p className="text-gray-600 text-lg">Enter your website URL and get detailed performance insights in under 60 seconds</p>
        </div>
        
        <Card className="bg-gray-50 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="audit-form">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <Label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </Label>
                  <div className="relative">
                    <i className="fas fa-globe absolute left-3 top-3.5 text-gray-400"></i>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      className="pl-10"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      required
                      data-testid="input-url"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-3.5 text-gray-400"></i>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-name"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary text-white px-8 py-4 text-lg hover:bg-blue-700 w-full md:w-auto"
                  data-testid="button-submit-audit"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Running Audit...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search mr-2"></i>
                      Run Free Audit
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 mt-3">
                  No signup required • Results ready in ~60 seconds
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
