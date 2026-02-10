export interface SavedFilters {
  quartiles: string[];
  journalType: string | null;
  exceptHighApcOa: boolean;
  noSubmissionFee: boolean;
  apcUnder1600: boolean;
  resultCount: number;
}

export interface SearchRecord {
  id: string;
  time: Date;
  orderName: string;
  articleFileName: string;
  articleFileUrl: string;
  resultId: string;
  filters?: SavedFilters;
}
