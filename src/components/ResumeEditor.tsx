import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Sparkles, CheckCircle, Upload, Zap } from "lucide-react";

interface ResumeEditorProps {
  className?: string;
}

export default function ResumeEditor({ className }: ResumeEditorProps) {
  const [link, setLink] = useState("");
  const [instructions, setInstructions] = useState("");
  const [improvementType, setImprovementType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const improvementOptions = [
    { value: "ats-optimize", label: "Optimize for ATS (Applicant Tracking Systems)" },
    { value: "skills-enhance", label: "Enhance skills section" },
    { value: "achievements-focus", label: "Focus on achievements and metrics" },
    { value: "format-improve", label: "Improve formatting and structure" },
    { value: "language-polish", label: "Polish language and grammar" },
    { value: "industry-specific", label: "Tailor for specific industry" },
    { value: "custom", label: "Custom improvements" },
  ];

  const validateGoogleDocsLink = (url: string) => {
    const docsPattern = /https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9-_]+)/;
    return docsPattern.test(url);
  };

  const handleSubmit = async () => {
    if (!link.trim()) {
      toast({
        title: "Missing Link",
        description: "Please paste your Google Docs link.",
        variant: "destructive",
      });
      return;
    }

    if (!validateGoogleDocsLink(link)) {
      toast({
        title: "Invalid Link",
        description: "Please enter a valid Google Docs link.",
        variant: "destructive",
      });
      return;
    }

    if (!improvementType.trim()) {
      toast({
        title: "Improvement Type Required",
        description: "Please select or write how you'd like to improve your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress steps
      const steps = [
        { message: "Accessing your Google Doc...", progress: 25 },
        { message: "Analyzing content with AI...", progress: 50 },
        { message: "Generating improvements...", progress: 75 },
        { message: "Updating your document...", progress: 100 },
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProgress(step.progress);
        
        toast({
          title: "Processing",
          description: step.message,
        });
      }

      // TODO: Implement actual API call to Supabase Edge Function
      // const response = await fetch('/api/edit-resume', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     link,
      //     improvementType,
      //     instructions: improvementType === 'custom' ? instructions : improvementOptions.find(opt => opt.value === improvementType)?.label
      //   })
      // });

      toast({
        title: "Resume Updated Successfully!",
        description: "Your Google Doc has been enhanced. Refresh it to see the changes.",
      });

      // Reset form
      setLink("");
      setInstructions("");
      setImprovementType("");
      
    } catch (error) {
      console.error("Error processing resume:", error);
      toast({
        title: "Processing Failed",
        description: "There was an error improving your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className={className}>
      <Card className="bg-gradient-card border-white/10 shadow-soft">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">AI Resume Editor</CardTitle>
          <CardDescription className="text-muted-foreground">
            Transform your Google Docs resume with AI-powered improvements
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="docs-link" className="text-sm font-medium">
              Google Docs Link
            </Label>
            <div className="relative">
              <Input
                id="docs-link"
                type="url"
                placeholder="https://docs.google.com/document/d/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="bg-secondary/50 border-white/10 pl-10"
                disabled={isProcessing}
              />
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Make sure your Google Doc is set to "Anyone with the link can edit"
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="improvement-type" className="text-sm font-medium">
              Improvement Type
            </Label>
            <Input
              id="improvement-type"
              list="improvement-type-list"
              placeholder="Choose or write how to improve your resume"
              value={improvementType}
              onChange={e => setImprovementType(e.target.value)}
              className="bg-secondary/50 border-white/10"
              disabled={isProcessing}
            />
            <datalist id="improvement-type-list">
              {improvementOptions.map(option => (
                <option key={option.value} value={option.label} />
              ))}
            </datalist>
          </div>

          {improvementType === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="instructions" className="text-sm font-medium">
                Custom Instructions
              </Label>
              <Textarea
                id="instructions"
                placeholder="Describe specific improvements you'd like to make to your resume..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="bg-secondary/50 border-white/10 min-h-[100px]"
                disabled={isProcessing}
              />
            </div>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="animate-spin">
                  <Zap className="h-4 w-4" />
                </div>
                <span>Processing your resume...</span>
              </div>
            </div>
          )}

          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin mr-2">
                  <Upload className="h-4 w-4" />
                </div>
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Improve My Resume
              </>
            )}
          </Button>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">ATS Optimized</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">AI Enhanced</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Direct Update</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}