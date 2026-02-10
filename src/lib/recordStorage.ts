import { SearchRecord } from "@/types/record";
import { mockRecords } from "@/data/mockRecords";

const STORAGE_KEY = "journal-search-records";

export const getRecords = (): SearchRecord[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with mock data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRecords));
    return mockRecords.map(r => ({ ...r, time: new Date(r.time) }));
  }
  return JSON.parse(stored).map((r: any) => ({ ...r, time: new Date(r.time) }));
};

export const saveRecord = (record: SearchRecord): void => {
  const records = getRecords();
  records.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const deleteRecords = (ids: string[]): void => {
  const records = getRecords().filter(r => !ids.includes(r.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
