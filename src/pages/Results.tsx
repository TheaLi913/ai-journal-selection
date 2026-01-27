import { useState, useMemo } from "react";
import { Download, FileOutput, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import ColumnVisibilityToggle from "@/components/ColumnVisibilityToggle";
import ResultCountSelector from "@/components/ResultCountSelector";
import JournalResultsTable from "@/components/JournalResultsTable";
import { mockJournalResults } from "@/data/mockJournals";
import { COLUMN_CONFIGS, ColumnKey, JournalResult } from "@/types/journal";

const Results = () => {
  const [resultCount, setResultCount] = useState(8);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    COLUMN_CONFIGS.filter((c) => c.defaultVisible).map((c) => c.key)
  );

  const sortedData = useMemo(() => {
    return [...mockJournalResults].sort((a, b) =>
      sortDirection === "desc" ? b.score - a.score : a.score - b.score
    );
  }, [sortDirection]);

  const displayedData = useMemo(() => {
    return sortedData.slice(0, resultCount);
  }, [sortedData, resultCount]);

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
    // Sort by score descending for export
    const exportData = [...mockJournalResults]
      .sort((a, b) => b.score - a.score)
      .slice(0, resultCount);

    const headers = [
      "Journal Name",
      "ISSN",
      "E-ISSN",
      "Publisher",
      "Quartile",
      "Matching Analysis",
      "Score",
      "APC",
      "Profile URL",
      "Aims & Scopes",
      "Preferences",
    ];

    const csvContent = [
      headers.join(","),
      ...exportData.map((journal) =>
        [
          `"${journal.journalName}"`,
          journal.issn,
          journal.eissn,
          `"${journal.publisher}"`,
          `Scopus ${journal.quartile}`,
          `"${journal.matchingAnalysis.join("; ")}"`,
          `${journal.score}%`,
          `"${journal.apc}"`,
          journal.profileUrl,
          `"${journal.aimsScopes}"`,
          `"${journal.preferences}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `journal-matching-results-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
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
              Export CSV
            </Button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-card/60 backdrop-blur-sm border border-border rounded-lg animate-slide-up">
          <ResultCountSelector value={resultCount} onChange={setResultCount} />
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
          Showing {displayedData.length} of {mockJournalResults.length} matched
          journals
        </div>
      </main>
    </div>
  );
};

export default Results;
