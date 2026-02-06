import { SearchRecord } from "@/types/record";

export const mockRecords: SearchRecord[] = [
  {
    id: "1",
    time: new Date("2025-02-05T14:32:00"),
    orderName: "Research Paper - AI in Healthcare",
    articleFileName: "ai_healthcare_study.pdf",
    articleFileUrl: "#",
    resultId: "result-001",
  },
  {
    id: "2",
    time: new Date("2025-02-04T09:15:00"),
    orderName: "Machine Learning Review",
    articleFileName: "ml_review_2025.docx",
    articleFileUrl: "#",
    resultId: "result-002",
  },
  {
    id: "3",
    time: new Date("2025-02-03T16:45:00"),
    orderName: "Climate Change Analysis",
    articleFileName: "climate_analysis.pdf",
    articleFileUrl: "#",
    resultId: "result-003",
  },
  {
    id: "4",
    time: new Date("2025-02-02T11:20:00"),
    orderName: "Quantum Computing Survey",
    articleFileName: "quantum_survey.docx",
    articleFileUrl: "#",
    resultId: "result-004",
  },
  {
    id: "5",
    time: new Date("2025-02-01T08:00:00"),
    orderName: "Biomedical Engineering Study",
    articleFileName: "biomedical_eng.pdf",
    articleFileUrl: "#",
    resultId: "result-005",
  },
];
