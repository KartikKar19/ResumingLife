import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ResumeEditor from "@/components/ResumeEditor";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

import lowAts from "@/assets/lowats.jpg";
import highAts from "@/assets/highats.jpg";


const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [showHighATS, setShowHighATS] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setShowEditor(true);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const handleViewExamples = () => {
    setShowExample(true);
    setTimeout(() => {
      exampleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <HeroSection onGetStarted={handleGetStarted} onViewExamples={handleViewExamples} />

      {showExample && (
        <section ref={exampleRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background/80 via-background/60 to-transparent">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">See AI Resume Optimization in Action</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="rounded-lg border bg-card p-6 shadow-md animate-pulse flex flex-col items-center">
                  <h3 className="font-semibold mb-2">Low ATS Score</h3>
                  <img src={lowAts} alt="Low ATS Resume Example" className="rounded shadow mb-2 max-h-72 object-contain" />
                  <span className="text-xs text-muted-foreground mb-4">Typical resume with poor formatting, generic content, and low keyword match.</span>
                  <button
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded shadow hover:bg-primary/90 transition-colors duration-200"
                    onClick={() => setShowHighATS(true)}
                  >
                    Optimize with AI
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div
                  className={`rounded-lg border bg-card p-6 shadow-md flex flex-col items-center transition-all duration-700 ease-in-out ${showHighATS ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}
                  style={{ minHeight: '350px' }}
                >
                  <h3 className="font-semibold mb-2">High ATS Score</h3>
                  <img src={highAts} alt="High ATS Resume Example" className="rounded shadow mb-2 max-h-72 object-contain" />
                  <span className="text-xs text-muted-foreground">Optimized resume with clear structure, strong keywords, and measurable achievements.</span>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-8">
              <div className="w-2/3 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-primary animate-progress-bar" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {showEditor && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div ref={editorRef}>
              <ResumeEditor />
            </div>
            <div className="text-center mt-12">
              <Button 
                variant="ghost" 
                onClick={scrollToTop}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built with AI • Powered by Google Docs API & ChatGPT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
