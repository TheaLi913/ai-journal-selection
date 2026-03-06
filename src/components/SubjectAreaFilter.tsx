import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import { scopusSubjectAreas } from "@/data/scopusSubjectAreas";

interface SubjectAreaFilterProps {
  majorField: string | null;
  subField: string | null;
  onMajorFieldChange: (value: string | null) => void;
  onSubFieldChange: (value: string | null) => void;
}

const SearchableSelect = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () =>
      options.filter((opt) =>
        opt.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors
          ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"}
          ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <div className="flex items-center gap-1">
          {value && !disabled && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
                setSearch("");
              }}
              className="rounded-full p-0.5 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-[200px] overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No results found
              </p>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground
                    ${value === opt ? "bg-accent text-accent-foreground" : ""}`}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SubjectAreaFilter = ({
  majorField,
  subField,
  onMajorFieldChange,
  onSubFieldChange,
}: SubjectAreaFilterProps) => {
  const majorOptions = useMemo(
    () => scopusSubjectAreas.map((area) => area.major),
    []
  );

  const subFieldOptions = useMemo(() => {
    if (!majorField) return [];
    const area = scopusSubjectAreas.find((a) => a.major === majorField);
    return area?.subFields || [];
  }, [majorField]);

  const handleMajorChange = (value: string | null) => {
    onMajorFieldChange(value);
    onSubFieldChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <label className="text-lg font-semibold text-foreground">
          Subject Area
        </label>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
          Optional
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">
            Major Field
          </label>
          <SearchableSelect
            value={majorField}
            onChange={handleMajorChange}
            options={majorOptions}
            placeholder="Select major field..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">
            Sub-field
          </label>
          <SearchableSelect
            value={subField}
            onChange={onSubFieldChange}
            options={subFieldOptions}
            placeholder={majorField ? "Select sub-field..." : "Select major field first"}
            disabled={!majorField}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectAreaFilter;
