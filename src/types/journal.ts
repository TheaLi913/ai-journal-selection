export interface JournalResult {
  id: string;
  journalName: string;
  issn: string;
  eissn: string;
  publisher: string;
  quartile: "Q1" | "Q2" | "Q3" | "Q4";
  matchingAnalysis: string[];
  score: number;
  apc: string;
  profileUrl: string;
  aimsScopes: string;
  preferences: string;
}

export type ColumnKey = 
  | "journalName"
  | "serialNumber"
  | "publisher"
  | "quartile"
  | "matchingAnalysis"
  | "score"
  | "apc"
  | "profileUrl"
  | "aimsScopes"
  | "preferences";

export interface ColumnConfig {
  key: ColumnKey;
  label: string;
  defaultVisible: boolean;
  sortable?: boolean;
}

export const COLUMN_CONFIGS: ColumnConfig[] = [
  { key: "journalName", label: "Journal Name", defaultVisible: true },
  { key: "serialNumber", label: "Serial Number", defaultVisible: true },
  { key: "publisher", label: "Publisher", defaultVisible: true },
  { key: "quartile", label: "Quartile", defaultVisible: true },
  { key: "matchingAnalysis", label: "Matching Analysis", defaultVisible: false },
  { key: "score", label: "Score", defaultVisible: false, sortable: true },
  { key: "apc", label: "APC", defaultVisible: true },
  { key: "profileUrl", label: "Profile URL", defaultVisible: true },
  { key: "aimsScopes", label: "Aims & Scopes", defaultVisible: false },
  { key: "preferences", label: "Preferences", defaultVisible: false },
];
