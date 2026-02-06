import { Link } from "react-router-dom";
import { Download, ExternalLink, History } from "lucide-react";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockRecords } from "@/data/mockRecords";
import { format } from "date-fns";

const Records = () => {
  const formatTime = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm");
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Records</h1>
          <p className="text-muted-foreground">
            View your search history and past journal matching results here.
          </p>
        </div>

        {/* Records Table */}
        <div className="max-w-5xl mx-auto">
          <div className="border rounded-lg overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold min-w-[160px]">Time</TableHead>
                  <TableHead className="font-semibold min-w-[200px]">Order Name</TableHead>
                  <TableHead className="font-semibold min-w-[180px]">Article File</TableHead>
                  <TableHead className="font-semibold min-w-[120px]">Result Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No search records yet. Start by analyzing an article.
                    </TableCell>
                  </TableRow>
                ) : (
                  mockRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/30">
                      <TableCell className="text-muted-foreground">
                        {formatTime(record.time)}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {record.orderName}
                      </TableCell>
                      <TableCell>
                        <a
                          href={record.articleFileUrl}
                          download={record.articleFileName}
                          className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {record.articleFileName}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/results?id=${record.resultId}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          View Results
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Records;
