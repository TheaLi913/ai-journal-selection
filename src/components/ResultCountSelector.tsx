import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultCountSelectorProps {
  value: number;
  onChange: (value: number) => void;
  totalMatched?: number;
}

const ResultCountSelector = ({ value, onChange, totalMatched }: ResultCountSelectorProps) => {
  const options = Array.from({ length: 20 }, (_, i) => i + 1);
  const max = totalMatched ?? 20;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Show</span>
      <Select
        value={value.toString()}
        onValueChange={(v) => onChange(parseInt(v))}
      >
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover z-50">
          {options.map((num) => (
            <SelectItem key={num} value={num.toString()} disabled={num > max}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">
        of {max} results
      </span>
    </div>
  );
};

export default ResultCountSelector;
