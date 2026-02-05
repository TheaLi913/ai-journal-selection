import { JournalResult } from "@/types/journal";

export const mockJournalResults: JournalResult[] = [
  {
    id: "1",
    journalName: "Nature Communications",
    issn: "2041-1723",
    eissn: "2041-1723",
    publisher: "Springer Nature",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Strong alignment with interdisciplinary research focus",
      "High citation impact in related subject areas",
      "Open access model matches submission preferences",
      "Recent publications show similar methodology approaches"
    ],
    score: 95,
    apc: "$5,790",
    profileUrl: "https://www.nature.com/ncomms/",
    aimsScopes: "Nature Communications is an open access journal that publishes high-quality research from all areas of the natural sciences.",
    preferences: "Original research articles, review articles with broad scientific interest"
  },
  {
    id: "2",
    journalName: "Scientific Reports",
    issn: "2045-2322",
    eissn: "2045-2322",
    publisher: "Springer Nature",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Broad scope covers multiple scientific disciplines",
      "Fast peer review process suitable for timely research",
      "High acceptance rate for methodologically sound research",
      "Strong visibility and indexing coverage"
    ],
    score: 88,
    apc: "$2,490",
    profileUrl: "https://www.nature.com/srep/",
    aimsScopes: "Scientific Reports publishes original research in all areas of natural sciences, psychology, medicine and engineering.",
    preferences: "Primary research papers, technical reports with reproducible results"
  },
  {
    id: "3",
    journalName: "PLOS ONE",
    issn: "1932-6203",
    eissn: "1932-6203",
    publisher: "Public Library of Science",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Multidisciplinary scope aligns with research topic",
      "Open access ensures wide dissemination",
      "Focuses on technical soundness over perceived impact",
      "Large readership in target research community"
    ],
    score: 82,
    apc: "$1,931",
    profileUrl: "https://journals.plos.org/plosone/",
    aimsScopes: "PLOS ONE features reports of original research from all disciplines within science and medicine.",
    preferences: "Research articles with sound methodology, negative results also considered"
  },
  {
    id: "4",
    journalName: "Frontiers in Medicine",
    issn: "2296-858X",
    eissn: "2296-858X",
    publisher: "Frontiers Media SA",
    quartile: "Q2",
    accessType: "hybrid",
    submissionFee: 0,
    matchingAnalysis: [
      "Specialized focus matches research domain",
      "Collaborative review process enhances quality",
      "Strong social media presence for article promotion",
      "Growing impact factor trajectory"
    ],
    score: 78,
    apc: "$2,950",
    profileUrl: "https://www.frontiersin.org/journals/medicine",
    aimsScopes: "Frontiers in Medicine publishes rigorously peer-reviewed research across a wide spectrum of medical specialties.",
    preferences: "Original research, clinical trials, systematic reviews, meta-analyses"
  },
  {
    id: "5",
    journalName: "BMC Research Notes",
    issn: "1756-0500",
    eissn: "1756-0500",
    publisher: "BioMed Central",
    quartile: "Q3",
    accessType: "open",
    submissionFee: 50,
    matchingAnalysis: [
      "Suitable for preliminary findings and smaller studies",
      "Quick turnaround time for publication",
      "Lower APC makes it cost-effective",
      "Part of established BMC journal family"
    ],
    score: 71,
    apc: "$1,290",
    profileUrl: "https://bmcresnotes.biomedcentral.com/",
    aimsScopes: "BMC Research Notes publishes scientifically sound research across all fields of biology and medicine.",
    preferences: "Short reports, data notes, case reports, methodology articles"
  },
  {
    id: "6",
    journalName: "PeerJ",
    issn: "2167-8359",
    eissn: "2167-8359",
    publisher: "PeerJ Inc.",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Innovative open peer review aligns with transparency goals",
      "Lifetime membership option for frequent publishers",
      "Strong data sharing policies complement research approach",
      "Active researcher community engagement"
    ],
    score: 75,
    apc: "$1,395",
    profileUrl: "https://peerj.com/",
    aimsScopes: "PeerJ is an open access peer-reviewed scientific journal covering research in biological and medical sciences.",
    preferences: "Research articles, literature reviews, replication studies encouraged"
  },
  {
    id: "7",
    journalName: "Journal of Clinical Medicine",
    issn: "2077-0383",
    eissn: "2077-0383",
    publisher: "MDPI AG",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Clinical focus matches applied research orientation",
      "Rapid publication process for time-sensitive research",
      "Strong indexing in medical databases",
      "Special issue opportunities for themed collections"
    ],
    score: 85,
    apc: "$2,600",
    profileUrl: "https://www.mdpi.com/journal/jcm",
    aimsScopes: "Journal of Clinical Medicine is a peer-reviewed open access journal focused on clinical research and practice.",
    preferences: "Clinical studies, observational research, evidence-based medicine"
  },
  {
    id: "8",
    journalName: "Applied Sciences",
    issn: "2076-3417",
    eissn: "2076-3417",
    publisher: "MDPI AG",
    quartile: "Q2",
    accessType: "hybrid",
    submissionFee: 0,
    matchingAnalysis: [
      "Broad engineering and technology scope",
      "Supports interdisciplinary research approaches",
      "Regular special issues in emerging topics",
      "International editorial board representation"
    ],
    score: 72,
    apc: "$2,400",
    profileUrl: "https://www.mdpi.com/journal/applsci",
    aimsScopes: "Applied Sciences covers all aspects of applied natural sciences and technology.",
    preferences: "Applied research, technology development, engineering applications"
  }
];
