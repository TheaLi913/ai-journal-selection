import { useState, useMemo, useEffect } from "react";
import { Download, FileOutput, ArrowLeft, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { saveRecord } from "@/lib/recordStorage";
import { Button } from "@/components/ui/button";
import ColumnVisibilityToggle from "@/components/ColumnVisibilityToggle";
import ResultCountSelector from "@/components/ResultCountSelector";
import JournalResultsTable from "@/components/JournalResultsTable";
import QuartileSelector from "@/components/QuartileSelector";
import JournalTypeSelector from "@/components/JournalTypeSelector";
import AdvancedFilters from "@/components/AdvancedFilters";
import { Switch } from "@/components/ui/switch";
import { mockJournalResults } from "@/data/mockJournals";
import { COLUMN_CONFIGS, ColumnKey, JournalResult } from "@/types/journal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderName = searchParams.get("orderName") || "Untitled_Query";
  const articleFileName = searchParams.get("articleFileName") || "article.pdf";
  const [resultCount, setResultCount] = useState(8);
  const [userSelectedCount, setUserSelectedCount] = useState(8);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    COLUMN_CONFIGS.filter((c) => c.defaultVisible).map((c) => c.key)
  );
  const [selectedQuartiles, setSelectedQuartiles] = useState<string[]>([]);
  const [journalType, setJournalType] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [exceptHighApcOa, setExceptHighApcOa] = useState(true);
  const [noSubmissionFee, setNoSubmissionFee] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [apcUnder1600, setApcUnder1600] = useState(true);

  // Helper function to parse APC string to number
  const parseApc = (apc: string): number => {
    const numStr = apc.replace(/[^0-9.]/g, "");
    return parseFloat(numStr) || 0;
  };

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let data = [...mockJournalResults];
    
    // Filter by quartile
    if (selectedQuartiles.length > 0) {
      data = data.filter((journal) => selectedQuartiles.includes(journal.quartile));
    }

    // Filter by journal type
    if (journalType) {
      data = data.filter((journal) => journal.accessType === journalType);
    }

    // Advanced filter: Except APC > 2000USD AND only OA
    if (exceptHighApcOa) {
      data = data.filter((journal) => {
        const apcValue = parseApc(journal.apc);
        const isHighApcOnlyOa = apcValue > 2000 && journal.accessType === "open";
        return !isHighApcOnlyOa;
      });
    }

    // Advanced filter: No Submission Fee
    if (noSubmissionFee) {
      data = data.filter((journal) => journal.submissionFee === 0);
    }

    // Filter: APC < 1600USD
    if (apcUnder1600) {
      data = data.filter((journal) => {
        const apcValue = parseApc(journal.apc);
        return apcValue < 1600;
      });
    }
    
    // Sort by score
    data.sort((a, b) =>
      sortDirection === "desc" ? b.score - a.score : a.score - b.score
    );
    
    return data;
  }, [selectedQuartiles, journalType, exceptHighApcOa, noSubmissionFee, apcUnder1600, sortDirection]);

  // Auto-clamp resultCount, restore user's choice when possible
  useEffect(() => {
    const max = filteredAndSortedData.length || 1;
    if (userSelectedCount <= max) {
      setResultCount(userSelectedCount);
    } else {
      setResultCount(max);
    }
  }, [filteredAndSortedData.length, userSelectedCount]);

  const displayedData = useMemo(() => {
    return filteredAndSortedData.slice(0, resultCount);
  }, [filteredAndSortedData, resultCount]);

  const handleColumnToggle = (column: ColumnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const handleSortChange = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const handleSaveToRecords = () => {
    const newRecord = {
      id: crypto.randomUUID(),
      time: new Date(),
      orderName,
      articleFileName,
      articleFileUrl: "#",
      resultId: `result-${Date.now()}`,
    };
    saveRecord(newRecord);
    toast.success("Query saved to Records", {
      description: `Saved ${displayedData.length} matching journals with current filters.`,
    });
  };

  const handleExport = () => {
    // Filter first, then sort by score descending for export
    let exportData = [...mockJournalResults];
    if (selectedQuartiles.length > 0) {
      exportData = exportData.filter((journal) => selectedQuartiles.includes(journal.quartile));
    }
    exportData.sort((a, b) => b.score - a.score).slice(0, resultCount);

    const worksheetData = exportData.map((journal) => ({
      "Journal Name": journal.journalName,
      "ISSN": journal.issn,
      "E-ISSN": journal.eissn,
      "Publisher": journal.publisher,
      "Quartile": `Scopus ${journal.quartile}`,
      "Matching Analysis": journal.matchingAnalysis.join("; "),
      "Score": `${journal.score}%`,
      "APC": journal.apc,
      "Profile URL": journal.profileUrl,
      "Aims & Scopes": journal.aimsScopes,
      "Preferences": journal.preferences,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Journal Results");
    
    XLSX.writeFile(workbook, `journal-matching-results-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileOutput className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Matching Results
                </h1>
              </div>
              <p className="text-muted-foreground">
                Found {displayedData.length} journals matching your criteria, sorted by
                relevance score.
              </p>
            </div>
            <Button
              onClick={handleExport}
              className="btn-primary-gradient gap-2 self-start md:self-auto"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-6 animate-slide-up">
          <div className="card-elevated p-4 md:p-6">
            <div className="flex items-center justify-between w-full">
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 text-left">
                  <Filter className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Filters</span>
                  {(selectedQuartiles.length > 0 || journalType || exceptHighApcOa || noSubmissionFee || apcUnder1600) && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      {selectedQuartiles.length + (journalType ? 1 : 0) + (exceptHighApcOa ? 1 : 0) + (noSubmissionFee ? 1 : 0) + (apcUnder1600 ? 1 : 0)} active
                    </span>
                  )}
                </button>
              </CollapsibleTrigger>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveToRecords}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Save
                </button>
                <CollapsibleTrigger asChild>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isFilterOpen ? "Hide" : "Show"}
                  </button>
                </CollapsibleTrigger>
              </div>
            </div>
            <CollapsibleContent className="pt-4 space-y-6">
              {/* Quartile Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Quartile Requirements
                </label>
                <QuartileSelector
                  selectedQuartiles={selectedQuartiles}
                  onSelectionChange={setSelectedQuartiles}
                />
              </div>
              
              {/* Journal Type Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Journal Type
                </label>
                <JournalTypeSelector
                  selectedType={journalType}
                  onSelectionChange={setJournalType}
                />
              </div>

              {/* APC Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  APC Limit
                </label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={apcUnder1600}
                    onCheckedChange={setApcUnder1600}
                  />
                  <span className="text-sm text-foreground">APC &lt; 1600USD</span>
                </div>
              </div>

              {/* Advanced Filters */}
              <AdvancedFilters
                exceptHighApcOa={exceptHighApcOa}
                noSubmissionFee={noSubmissionFee}
                onExceptHighApcOaChange={setExceptHighApcOa}
                onNoSubmissionFeeChange={setNoSubmissionFee}
                isVisible={showAdvancedFilters}
                onToggleVisibility={() => setShowAdvancedFilters(!showAdvancedFilters)}
              />
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-card/60 backdrop-blur-sm border border-border rounded-lg animate-slide-up">
          <ResultCountSelector value={resultCount} onChange={(v) => { setUserSelectedCount(v); setResultCount(v); }} totalMatched={filteredAndSortedData.length} />
          <ColumnVisibilityToggle
            visibleColumns={visibleColumns}
            onToggle={handleColumnToggle}
          />
        </div>

        {/* Results Table */}
        <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
          <JournalResultsTable
            data={displayedData}
            visibleColumns={visibleColumns}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Summary Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {displayedData.length} of {filteredAndSortedData.length} matched
          journals
          {selectedQuartiles.length > 0 && ` (filtered from ${mockJournalResults.length} total)`}
        </div>
      </main>
    </div>
  );
};

export default Results;
