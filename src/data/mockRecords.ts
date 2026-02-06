import { SearchRecord } from "@/types/record";

export const mockRecords: SearchRecord[] = [
  {
    id: "1",
    time: new Date("2025-02-05T14:32:00"),
    orderName: "Smith_12_Publication",
    articleFileName: "ai_healthcare_study.pdf",
    articleFileUrl: "#",
    resultId: "result-001",
  },
  {
    id: "2",
    time: new Date("2025-02-04T09:15:00"),
    orderName: "Johnson_05_Publication",
    articleFileName: "ml_review_2025.docx",
    articleFileUrl: "#",
    resultId: "result-002",
  },
  {
    id: "3",
    time: new Date("2025-01-28T16:45:00"),
    orderName: "Williams_23_Publication",
    articleFileName: "climate_analysis.pdf",
    articleFileUrl: "#",
    resultId: "result-003",
  },
  {
    id: "4",
    time: new Date("2025-01-15T11:20:00"),
    orderName: "Brown_08_Publication",
    articleFileName: "quantum_survey.docx",
    articleFileUrl: "#",
    resultId: "result-004",
  },
  {
    id: "5",
    time: new Date("2024-12-20T08:00:00"),
    orderName: "Davis_67_Publication",
    articleFileName: "biomedical_eng.pdf",
    articleFileUrl: "#",
    resultId: "result-005",
  },
];
