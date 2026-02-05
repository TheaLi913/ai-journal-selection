 import { Check, ChevronDown, ChevronUp } from "lucide-react";
 
 interface AdvancedFiltersProps {
   exceptHighApcOa: boolean;
   noSubmissionFee: boolean;
   onExceptHighApcOaChange: (value: boolean) => void;
   onNoSubmissionFeeChange: (value: boolean) => void;
   isVisible: boolean;
   onToggleVisibility: () => void;
 }
 
 const AdvancedFilters = ({
   exceptHighApcOa,
   noSubmissionFee,
   onExceptHighApcOaChange,
   onNoSubmissionFeeChange,
   isVisible,
   onToggleVisibility,
 }: AdvancedFiltersProps) => {
   return (
     <div className="border-t border-border pt-4 mt-4">
       <button
         type="button"
         onClick={onToggleVisibility}
         className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
       >
         {isVisible ? (
           <ChevronUp className="w-4 h-4" />
         ) : (
           <ChevronDown className="w-4 h-4" />
         )}
         <span>Advanced Filters</span>
         {(exceptHighApcOa || noSubmissionFee) && !isVisible && (
           <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
             {(exceptHighApcOa ? 1 : 0) + (noSubmissionFee ? 1 : 0)} active
           </span>
         )}
       </button>
 
       {isVisible && (
         <div className="mt-4 space-y-3">
           <label className="flex items-center gap-3 cursor-pointer group">
             <div
               className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                 exceptHighApcOa
                   ? "border-primary bg-primary"
                   : "border-border group-hover:border-primary/50"
               }`}
               onClick={() => onExceptHighApcOaChange(!exceptHighApcOa)}
             >
               {exceptHighApcOa && <Check className="w-3 h-3 text-primary-foreground" />}
             </div>
             <span className="text-sm text-foreground">
               Except APC &gt; 2000USD ∩ only OA
             </span>
           </label>
 
           <label className="flex items-center gap-3 cursor-pointer group">
             <div
               className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                 noSubmissionFee
                   ? "border-primary bg-primary"
                   : "border-border group-hover:border-primary/50"
               }`}
               onClick={() => onNoSubmissionFeeChange(!noSubmissionFee)}
             >
               {noSubmissionFee && <Check className="w-3 h-3 text-primary-foreground" />}
             </div>
             <span className="text-sm text-foreground">No Submission Fee</span>
           </label>
         </div>
       )}
     </div>
   );
 };
 
 export default AdvancedFilters;