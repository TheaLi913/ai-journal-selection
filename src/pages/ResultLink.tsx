import { useState, useMemo } from "react";
import { Download, FileOutput, ArrowLeft, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import ColumnVisibilityToggle from "@/components/ColumnVisibilityToggle";
import JournalResultsTable from "@/components/JournalResultsTable";
import { mockJournalResults } from "@/data/mockJournals";
import { COLUMN_CONFIGS, ColumnKey } from "@/types/journal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ResultLink = () => {
  const [searchParams] = useSearchParams();
  const recordId = searchParams.get("id");

  // These filter values are "saved" from the record — read-only display
  const savedQuartiles = ["Q1", "Q2"];
  const savedJournalType: string | null = null;
  const savedExceptHighApcOa = true;
  const savedNoSubmissionFee = true;
  const savedApcUnder1600 = true;

  const [resultCount, setResultCount] = useState(8);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    COLUMN_CONFIGS.filter((c) => c.defaultVisible).map((c) => c.key)
  );
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const parseApc = (apc: string): number => {
    const numStr = apc.replace(/[^0-9.]/g, "");
    return parseFloat(numStr) || 0;
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...mockJournalResults];

    if (savedQuartiles.length > 0) {
      data = data.filter((journal) => savedQuartiles.includes(journal.quartile));
    }

    if (savedJournalType) {
      data = data.filter((journal) => journal.accessType === savedJournalType);
    }

    if (savedExceptHighApcOa) {
      data = data.filter((journal) => {
        const apcValue = parseApc(journal.apc);
        const isHighApcOnlyOa = apcValue > 2000 && journal.accessType === "open";
        return !isHighApcOnlyOa;
      });
    }

    if (savedNoSubmissionFee) {
      data = data.filter((journal) => journal.submissionFee === 0);
    }

    if (savedApcUnder1600) {
      data = data.filter((journal) => {
        const apcValue = parseApc(journal.apc);
        return apcValue < 1600;
      });
    }

    data.sort((a, b) =>
      sortDirection === "desc" ? b.score - a.score : a.score - b.score
    );

    return data;
  }, [sortDirection]);

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

  const handleExport = () => {
    const exportData = filteredAndSortedData.slice(0, resultCount);

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

    XLSX.writeFile(workbook, `journal-results-${recordId || "export"}-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Count active filters for badge
  const activeFilterCount =
    savedQuartiles.length +
    (savedJournalType ? 1 : 0) +
    (savedExceptHighApcOa ? 1 : 0) +
    (savedNoSubmissionFee ? 1 : 0) +
    (savedApcUnder1600 ? 1 : 0);

  return (
    <div className="min-h-screen gradient-hero">
      {/* No Header — replaced with simple back link */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/records"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Records
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileOutput className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Saved Results
                </h1>
              </div>
              <p className="text-muted-foreground">
                Viewing {displayedData.length} saved journal results.
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

        {/* Read-only Filter Section */}
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-6 animate-slide-up">
          <div className="card-elevated p-4 md:p-6">
            <div className="flex items-center justify-between w-full">
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 text-left">
                  <Filter className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Filters</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    Read-only
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                      {activeFilterCount} active
                    </span>
                  )}
                </button>
              </CollapsibleTrigger>
              <CollapsibleTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {isFilterOpen ? "Hide" : "Show"}
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pt-4 space-y-4">
              {/* Read-only filter display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Quartile */}
                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-foreground">Quartile</span>
                  <div className="flex flex-wrap gap-1.5">
                    {savedQuartiles.length > 0 ? (
                      savedQuartiles.map((q) => (
                        <span
                          key={q}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {q}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">All</span>
                    )}
                  </div>
                </div>

                {/* Journal Type */}
                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-foreground">Journal Type</span>
                  <p className="text-sm text-muted-foreground">
                    {savedJournalType === "open"
                      ? "Open Access"
                      : savedJournalType === "subscription"
                        ? "Subscription"
                        : "All Types"}
                  </p>
                </div>

                {/* APC Limit */}
                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-foreground">APC Limit</span>
                  <p className="text-sm text-muted-foreground">
                    {savedApcUnder1600 ? "APC < 1600USD" : "No limit"}
                  </p>
                </div>

                {/* Except High APC OA */}
                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-foreground">Except APC &gt; 2000USD ∩ OA</span>
                  <p className="text-sm text-muted-foreground">
                    {savedExceptHighApcOa ? "Enabled" : "Disabled"}
                  </p>
                </div>

                {/* No Submission Fee */}
                <div className="space-y-1.5">
                  <span className="text-sm font-medium text-foreground">No Submission Fee</span>
                  <p className="text-sm text-muted-foreground">
                    {savedNoSubmissionFee ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-card/60 backdrop-blur-sm border border-border rounded-lg animate-slide-up">
          <span className="text-sm text-muted-foreground">Show {resultCount} results</span>
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

        {/* No bottom summary text */}
      </main>
    </div>
  );
};

export default ResultLink;
