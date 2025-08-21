import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-resume.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewExamples?: () => void;
}

export default function HeroSection({ onGetStarted, onViewExamples }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Resume Enhancement
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Resume
                </span>{" "}
                with AI
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Upload your Google Docs resume and let our AI enhance it for better ATS compatibility, 
                improved language, and stronger impact statements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="glass" size="lg" className="text-lg" onClick={onViewExamples}>
                <FileText className="mr-2 h-5 w-5" />
                View Examples
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Process in under 60 seconds
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">AI Enhanced</h3>
                <p className="text-sm text-muted-foreground">
                  GPT-4 powered improvements
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Direct Update</h3>
                <p className="text-sm text-muted-foreground">
                  Updates your original doc
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Resume transformation preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-gradient-card p-4 rounded-xl shadow-soft border border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">AI Processing</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-card p-4 rounded-xl shadow-soft border border-white/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Enhanced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}