import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Trash2, Search, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, isBefore, isEqual, setMonth, setYear } from "date-fns";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Records = () => {
  const [records, setRecords] = useState<SearchRecord[]>(mockRecords);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchOrderName, setSearchOrderName] = useState("");
  const [appliedSearchOrderName, setAppliedSearchOrderName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [appliedMonth, setAppliedMonth] = useState<Date | null>(null);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);

  const currentDate = new Date();
  const currentMonthStart = startOfMonth(currentDate);

  // Check if a month is selectable (current month or before)
  const isMonthSelectable = (year: number, monthIndex: number) => {
    const monthDate = startOfMonth(new Date(year, monthIndex, 1));
    return isBefore(monthDate, currentMonthStart) || isEqual(monthDate, currentMonthStart);
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (isMonthSelectable(pickerYear, monthIndex)) {
      setSelectedMonth(new Date(pickerYear, monthIndex, 1));
      setMonthPickerOpen(false);
    }
  };

  const handleSearch = () => {
    setAppliedSearchOrderName(searchOrderName);
    setAppliedMonth(selectedMonth);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchOrderName("");
    setSelectedMonth(null);
    setAppliedSearchOrderName("");
    setAppliedMonth(null);
    setCurrentPage(1);
  };

  // Filter records based on applied search criteria
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      // Filter by order name
      if (appliedSearchOrderName && !record.orderName.toLowerCase().includes(appliedSearchOrderName.toLowerCase())) {
        return false;
      }
      
      // Filter by month
      if (appliedMonth) {
        const recordMonth = format(record.time, "yyyy-MM");
        const selectedMonthStr = format(appliedMonth, "yyyy-MM");
        if (recordMonth !== selectedMonthStr) {
          return false;
        }
      }
      
      return true;
    });
  }, [records, appliedSearchOrderName, appliedMonth]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRecords, currentPage]);

  const formatTime = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedRecords.map((r) => r.id));
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

  const isAllSelected = paginatedRecords.length > 0 && paginatedRecords.every(r => selectedIds.includes(r.id));
  const isSomeSelected = paginatedRecords.some(r => selectedIds.includes(r.id)) && !isAllSelected;

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
              {/* Month Picker */}
              <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-48 justify-start text-left font-normal",
                      !selectedMonth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedMonth ? format(selectedMonth, "MMMM yyyy") : "Query Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" align="start">
                  {/* Year Navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setPickerYear(pickerYear - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">{pickerYear}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setPickerYear(pickerYear + 1)}
                      disabled={pickerYear >= currentDate.getFullYear()}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Month Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {months.map((month, index) => {
                      const selectable = isMonthSelectable(pickerYear, index);
                      const isSelected = selectedMonth && 
                        selectedMonth.getFullYear() === pickerYear && 
                        selectedMonth.getMonth() === index;
                      
                      return (
                        <Button
                          key={month}
                          variant={isSelected ? "default" : "ghost"}
                          size="sm"
                          className={cn(
                            "h-9",
                            !selectable && "opacity-50 cursor-not-allowed"
                          )}
                          disabled={!selectable}
                          onClick={() => handleMonthSelect(index)}
                        >
                          {month}
                        </Button>
                      );
                    })}
                  </div>
                  {/* Clear Button */}
                  {selectedMonth && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => {
                        setSelectedMonth(null);
                        setMonthPickerOpen(false);
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </PopoverContent>
              </Popover>

              {/* Order Name Search */}
              <div className="relative flex-1 sm:max-w-xs">
                <Input
                  placeholder="Search Order Name..."
                  value={searchOrderName}
                  onChange={(e) => setSearchOrderName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} className="shrink-0">
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
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
                {paginatedRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRecords.map((record) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-2">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length} records
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Records;
