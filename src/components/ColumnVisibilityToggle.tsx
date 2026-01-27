import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COLUMN_CONFIGS, ColumnKey } from "@/types/journal";

interface ColumnVisibilityToggleProps {
  visibleColumns: ColumnKey[];
  onToggle: (column: ColumnKey) => void;
}

const ColumnVisibilityToggle = ({
  visibleColumns,
  onToggle,
}: ColumnVisibilityToggleProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Toggle Columns</p>
          <div className="space-y-2">
            {COLUMN_CONFIGS.map((config) => (
              <label
                key={config.key}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <Checkbox
                  checked={visibleColumns.includes(config.key)}
                  onCheckedChange={() => onToggle(config.key)}
                />
                <span className="text-muted-foreground">{config.label}</span>
              </label>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnVisibilityToggle;
