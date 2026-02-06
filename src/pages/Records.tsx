import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Trash2, Search } from "lucide-react";
import { format, startOfMonth, isBefore, isEqual } from "date-fns";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { mockRecords } from "@/data/mockRecords";
import { SearchRecord } from "@/types/record";
import { toast } from "sonner";

const Records = () => {
  const [records, setRecords] = useState<SearchRecord[]>(mockRecords);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchOrderName, setSearchOrderName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // Generate month options (current month and previous months)
  const monthOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    const now = new Date();
    const currentMonth = startOfMonth(now);
    
    // Generate last 12 months including current
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentMonth);
      date.setMonth(date.getMonth() - i);
      options.push({
        value: format(date, "yyyy-MM"),
        label: format(date, "MMMM yyyy"),
      });
    }
    return options;
  }, []);

  // Filter records based on search criteria
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      // Filter by order name
      if (searchOrderName && !record.orderName.toLowerCase().includes(searchOrderName.toLowerCase())) {
        return false;
      }
      
      // Filter by month
      if (selectedMonth !== "all") {
        const recordMonth = format(record.time, "yyyy-MM");
        if (recordMonth !== selectedMonth) {
          return false;
        }
      }
      
      return true;
    });
  }, [records, searchOrderName, selectedMonth]);

  const formatTime = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredRecords.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleDeleteSelected = () => {
    setRecords((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    toast.success(`Deleted ${selectedIds.length} record(s)`);
    setSelectedIds([]);
  };

  const handleDeleteOne = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    toast.success("Record deleted");
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const isAllSelected = filteredRecords.length > 0 && selectedIds.length === filteredRecords.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < filteredRecords.length;

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
              {/* Month Filter */}
              <div className="w-full sm:w-48">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Query Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {monthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Name Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Order Name..."
                  value={searchOrderName}
                  onChange={(e) => setSearchOrderName(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Batch Delete Button */}
            {selectedIds.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedIds.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Records</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {selectedIds.length} selected record(s)? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteSelected}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Records Table */}
        <div className="max-w-5xl mx-auto">
          <div className="border rounded-lg overflow-hidden bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                      className={isSomeSelected ? "data-[state=checked]:bg-primary" : ""}
                    />
                  </TableHead>
                  <TableHead className="font-semibold min-w-[160px]">Time</TableHead>
                  <TableHead className="font-semibold min-w-[200px]">Order Name</TableHead>
                  <TableHead className="font-semibold min-w-[180px]">Article File</TableHead>
                  <TableHead className="font-semibold min-w-[120px]">Result Link</TableHead>
                  <TableHead className="font-semibold min-w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(record.id)}
                          onCheckedChange={(checked) => handleSelectOne(record.id, checked as boolean)}
                          aria-label={`Select ${record.orderName}`}
                        />
                      </TableCell>
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
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this record? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteOne(record.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
