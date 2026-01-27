import { Globe, Lock, Shuffle } from "lucide-react";

interface JournalTypeSelectorProps {
  selectedType: string | null;
  onSelectionChange: (type: string | null) => void;
}

const journalTypes = [
  { 
    id: "open", 
    label: "Open Access", 
    description: "Free to read and share",
    icon: Globe 
  },
  { 
    id: "closed", 
    label: "Closed Access", 
    description: "Subscription required",
    icon: Lock 
  },
  { 
    id: "hybrid", 
    label: "Hybrid Journal", 
    description: "Both options available",
    icon: Shuffle 
  },
];

const JournalTypeSelector = ({ selectedType, onSelectionChange }: JournalTypeSelectorProps) => {
  const handleSelect = (typeId: string) => {
    if (selectedType === typeId) {
      onSelectionChange(null);
    } else {
      onSelectionChange(typeId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {journalTypes.map((type) => {
        const isSelected = selectedType === type.id;
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => handleSelect(type.id)}
            className="radio-card text-left group"
            data-checked={isSelected}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{type.label}</p>
                <p className="text-xs text-muted-foreground">{type.description}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "border-accent"
                    : "border-border group-hover:border-accent/50"
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default JournalTypeSelector;
