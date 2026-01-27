import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JournalResult, ColumnKey } from "@/types/journal";

interface JournalResultsTableProps {
  data: JournalResult[];
  visibleColumns: ColumnKey[];
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
}

const QuartileBadge = ({ quartile }: { quartile: string }) => {
  const colorMap: Record<string, string> = {
    Q1: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Q2: "bg-blue-100 text-blue-700 border-blue-200",
    Q3: "bg-amber-100 text-amber-700 border-amber-200",
    Q4: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <Badge variant="outline" className={colorMap[quartile] || ""}>
      Scopus {quartile}
    </Badge>
  );
};

const ScoreBadge = ({ score }: { score: number }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-slate-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getScoreColor(score)} rounded-full transition-all`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-medium">{score}%</span>
    </div>
  );
};

const JournalResultsTable = ({
  data,
  visibleColumns,
  sortDirection,
  onSortChange,
}: JournalResultsTableProps) => {
  const isColumnVisible = (key: ColumnKey) => visibleColumns.includes(key);

  const SortIcon = () => {
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {isColumnVisible("journalName") && (
                <TableHead className="font-semibold min-w-[200px]">Journal Name</TableHead>
              )}
              {isColumnVisible("serialNumber") && (
                <TableHead className="font-semibold min-w-[140px]">Serial Number</TableHead>
              )}
              {isColumnVisible("publisher") && (
                <TableHead className="font-semibold min-w-[160px]">Publisher</TableHead>
              )}
              {isColumnVisible("quartile") && (
                <TableHead className="font-semibold min-w-[120px]">Quartile</TableHead>
              )}
              {isColumnVisible("matchingAnalysis") && (
                <TableHead className="font-semibold min-w-[300px]">Matching Analysis</TableHead>
              )}
              {isColumnVisible("score") && (
                <TableHead className="font-semibold min-w-[140px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 -ml-3 font-semibold hover:bg-transparent"
                    onClick={onSortChange}
                  >
                    Score
                    <SortIcon />
                  </Button>
                </TableHead>
              )}
              {isColumnVisible("apc") && (
                <TableHead className="font-semibold min-w-[100px]">APC</TableHead>
              )}
              {isColumnVisible("profileUrl") && (
                <TableHead className="font-semibold min-w-[120px]">Profile URL</TableHead>
              )}
              {isColumnVisible("aimsScopes") && (
                <TableHead className="font-semibold min-w-[300px]">Aims & Scopes</TableHead>
              )}
              {isColumnVisible("preferences") && (
                <TableHead className="font-semibold min-w-[250px]">Preferences</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((journal, index) => (
              <TableRow key={journal.id} className="hover:bg-muted/30">
                {isColumnVisible("journalName") && (
                  <TableCell className="font-medium text-foreground">
                    {journal.journalName}
                  </TableCell>
                )}
                {isColumnVisible("serialNumber") && (
                  <TableCell>
                    <div className="text-sm space-y-0.5">
                      <div>
                        <span className="text-muted-foreground">ISSN: </span>
                        {journal.issn}
                      </div>
                      <div>
                        <span className="text-muted-foreground">E-ISSN: </span>
                        {journal.eissn}
                      </div>
                    </div>
                  </TableCell>
                )}
                {isColumnVisible("publisher") && (
                  <TableCell className="text-muted-foreground">
                    {journal.publisher}
                  </TableCell>
                )}
                {isColumnVisible("quartile") && (
                  <TableCell>
                    <QuartileBadge quartile={journal.quartile} />
                  </TableCell>
                )}
                {isColumnVisible("matchingAnalysis") && (
                  <TableCell>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {journal.matchingAnalysis.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                )}
                {isColumnVisible("score") && (
                  <TableCell>
                    <ScoreBadge score={journal.score} />
                  </TableCell>
                )}
                {isColumnVisible("apc") && (
                  <TableCell className="font-medium">{journal.apc}</TableCell>
                )}
                {isColumnVisible("profileUrl") && (
                  <TableCell>
                    <a
                      href={journal.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      Visit
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TableCell>
                )}
                {isColumnVisible("aimsScopes") && (
                  <TableCell className="text-sm text-muted-foreground max-w-[300px]">
                    {journal.aimsScopes}
                  </TableCell>
                )}
                {isColumnVisible("preferences") && (
                  <TableCell className="text-sm text-muted-foreground max-w-[250px]">
                    {journal.preferences}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JournalResultsTable;
