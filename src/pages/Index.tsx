import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";

const Index = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = !!file;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header disableResults={!file} />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Journal Matching
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Find the Perfect Journal
          </h1>
        </div>

        {/* Main Form Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card-elevated p-6 md:p-8 animate-slide-up">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {/* File Upload Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-lg font-semibold text-foreground">
                    Article File
                  </label>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                    Required
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your research article for AI analysis. Supported formats: DOC, DOCX, PDF.
                </p>
                <FileUpload onFileSelect={setFile} />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="btn-primary-gradient flex items-center gap-2 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Article...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Find Matching Journals
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
