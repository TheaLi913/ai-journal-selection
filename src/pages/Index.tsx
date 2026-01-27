import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import QuartileSelector from "@/components/QuartileSelector";
import JournalTypeSelector from "@/components/JournalTypeSelector";

const Index = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [selectedQuartiles, setSelectedQuartiles] = useState<string[]>([]);
  const [journalType, setJournalType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = file && selectedQuartiles.length > 0;

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
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Journal Matching
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            Find the Perfect Journal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your research article and let our AI analyze your content to recommend 
            the most suitable journals matching your requirements.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-3xl mx-auto">
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
                <FileUpload onFileSelect={setFile} />
              </div>

              {/* Quartile Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-lg font-semibold text-foreground">
                    Quartile Requirements
                  </label>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">
                    Required
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Select one or more Scopus quartiles to filter journal recommendations.
                </p>
                <QuartileSelector 
                  selectedQuartiles={selectedQuartiles}
                  onSelectionChange={setSelectedQuartiles}
                />
                {selectedQuartiles.length === 0 && (
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Please select at least one quartile
                  </p>
                )}
              </div>

              {/* Journal Type Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-lg font-semibold text-foreground">
                    Journal Type
                  </label>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    Optional
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Filter by access type if you have a preference.
                </p>
                <JournalTypeSelector 
                  selectedType={journalType}
                  onSelectionChange={setJournalType}
                />
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

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { title: "Smart Analysis", desc: "AI extracts key topics, methodology, and research focus" },
              { title: "Accurate Matching", desc: "Matches against comprehensive journal database" },
              { title: "Complete Info", desc: "Get impact factors, acceptance rates, and more" },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-4 text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
