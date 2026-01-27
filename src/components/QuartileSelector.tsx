import { Check } from "lucide-react";

interface QuartileSelectorProps {
  selectedQuartiles: string[];
  onSelectionChange: (quartiles: string[]) => void;
}

const quartiles = [
  { id: "Q1", label: "Scopus Q1", description: "Top 25% journals", color: "hsl(var(--success))" },
  { id: "Q2", label: "Scopus Q2", description: "Top 25-50% journals", color: "hsl(var(--accent))" },
  { id: "Q3", label: "Scopus Q3", description: "Top 50-75% journals", color: "hsl(var(--warning))" },
  { id: "Q4", label: "Scopus Q4", description: "Bottom 25% journals", color: "hsl(var(--muted-foreground))" },
];

const QuartileSelector = ({ selectedQuartiles, onSelectionChange }: QuartileSelectorProps) => {
  const toggleQuartile = (quartileId: string) => {
    if (selectedQuartiles.includes(quartileId)) {
      onSelectionChange(selectedQuartiles.filter(q => q !== quartileId));
    } else {
      onSelectionChange([...selectedQuartiles, quartileId]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {quartiles.map((quartile) => {
        const isSelected = selectedQuartiles.includes(quartile.id);
        return (
          <button
            key={quartile.id}
            type="button"
            onClick={() => toggleQuartile(quartile.id)}
            className="checkbox-card text-left group"
            data-checked={isSelected}
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${quartile.color}20`, color: quartile.color }}
              >
                {quartile.id}
              </div>
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border group-hover:border-primary/50"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </div>
            <p className="font-medium text-foreground text-sm">{quartile.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{quartile.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default QuartileSelector;
