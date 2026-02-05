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
  },
  {
    id: "9",
    journalName: "Heliyon",
    issn: "2405-8440",
    eissn: "2405-8440",
    publisher: "Elsevier",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Multidisciplinary scope covers wide research areas",
      "Fast peer review process",
      "Good visibility in scientific databases",
      "Transparent editorial process"
    ],
    score: 79,
    apc: "$1,390",
    profileUrl: "https://www.cell.com/heliyon/home",
    aimsScopes: "Heliyon is an all-science, open access journal that publishes robust research across all disciplines.",
    preferences: "Original research, reviews, case studies across all scientific fields"
  },
  {
    id: "10",
    journalName: "Data in Brief",
    issn: "2352-3409",
    eissn: "2352-3409",
    publisher: "Elsevier",
    quartile: "Q3",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Ideal for publishing datasets alongside main research",
      "Promotes data sharing and reproducibility",
      "Quick publication turnaround",
      "Indexed in major databases"
    ],
    score: 68,
    apc: "$590",
    profileUrl: "https://www.journals.elsevier.com/data-in-brief",
    aimsScopes: "Data in Brief provides a way to describe and share research data with the scientific community.",
    preferences: "Data articles, dataset descriptions, supplementary data publications"
  },
  {
    id: "11",
    journalName: "F1000Research",
    issn: "2046-1402",
    eissn: "2046-1402",
    publisher: "F1000 Research Ltd",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Open peer review enhances transparency",
      "Rapid publication model",
      "Post-publication peer review process",
      "Strong data sharing requirements"
    ],
    score: 76,
    apc: "$1,350",
    profileUrl: "https://f1000research.com/",
    aimsScopes: "F1000Research is an open research publishing platform for scientists, scholars and clinicians.",
    preferences: "Research articles, case reports, software tools, data notes"
  },
  {
    id: "12",
    journalName: "SAGE Open",
    issn: "2158-2440",
    eissn: "2158-2440",
    publisher: "SAGE Publications",
    quartile: "Q3",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Covers social and behavioral sciences",
      "Established publisher reputation",
      "Broad interdisciplinary scope",
      "Good acceptance rate for quality research"
    ],
    score: 65,
    apc: "$995",
    profileUrl: "https://journals.sagepub.com/home/sgo",
    aimsScopes: "SAGE Open is a peer-reviewed, open access journal that publishes original research in the social and behavioral sciences.",
    preferences: "Original research, methodological innovations, theoretical contributions"
  },
  {
    id: "13",
    journalName: "Cogent Engineering",
    issn: "2331-1916",
    eissn: "2331-1916",
    publisher: "Taylor & Francis",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Focus on engineering and technology",
      "Multidisciplinary engineering coverage",
      "Rapid peer review process",
      "Open access maximizes reach"
    ],
    score: 73,
    apc: "$1,150",
    profileUrl: "https://www.tandfonline.com/toc/oaen20/current",
    aimsScopes: "Cogent Engineering publishes research across all areas of engineering and technology.",
    preferences: "Research articles, technical notes, review papers in engineering"
  },
  {
    id: "14",
    journalName: "Journal of Open Source Software",
    issn: "2475-9066",
    eissn: "2475-9066",
    publisher: "Open Journals",
    quartile: "Q2",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Perfect for software-based research outputs",
      "Community-driven peer review",
      "No publication fees",
      "High visibility in developer community"
    ],
    score: 81,
    apc: "$0",
    profileUrl: "https://joss.theoj.org/",
    aimsScopes: "JOSS is a developer friendly journal for research software packages.",
    preferences: "Software papers, open source tools, computational methods"
  },
  {
    id: "15",
    journalName: "European Science Editing",
    issn: "0258-3127",
    eissn: "2518-3354",
    publisher: "EASE",
    quartile: "Q4",
    accessType: "hybrid",
    submissionFee: 0,
    matchingAnalysis: [
      "Niche focus on science communication",
      "Good for editorial and publishing research",
      "Active professional community",
      "Reasonable turnaround time"
    ],
    score: 58,
    apc: "$450",
    profileUrl: "https://ese.arphahub.com/",
    aimsScopes: "European Science Editing covers all aspects of editing, publishing and communication in science.",
    preferences: "Research articles, perspectives, reviews on science editing"
  },
  {
    id: "16",
    journalName: "Open Medicine",
    issn: "2391-5463",
    eissn: "2391-5463",
    publisher: "De Gruyter",
    quartile: "Q3",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Covers clinical and basic medical research",
      "Indexed in PubMed and Scopus",
      "Reasonable APC for open access",
      "International editorial board"
    ],
    score: 67,
    apc: "$1,100",
    profileUrl: "https://www.degruyter.com/journal/key/med/html",
    aimsScopes: "Open Medicine publishes peer-reviewed articles in all areas of medicine.",
    preferences: "Clinical research, basic medical sciences, case reports"
  },
  {
    id: "17",
    journalName: "Wellcome Open Research",
    issn: "2398-502X",
    eissn: "2398-502X",
    publisher: "F1000 Research Ltd",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Prestigious Wellcome Trust backing",
      "No APC for Wellcome-funded research",
      "Transparent peer review",
      "High visibility and impact"
    ],
    score: 89,
    apc: "$0",
    profileUrl: "https://wellcomeopenresearch.org/",
    aimsScopes: "Wellcome Open Research is a platform for Wellcome-funded researchers to rapidly publish their research.",
    preferences: "All Wellcome-funded research, negative results welcome"
  },
  {
    id: "18",
    journalName: "Cureus",
    issn: "2168-8184",
    eissn: "2168-8184",
    publisher: "Springer Nature",
    quartile: "Q3",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Free publication for medical research",
      "Fast peer review process",
      "Strong community engagement",
      "Good for case reports and reviews"
    ],
    score: 64,
    apc: "$0",
    profileUrl: "https://www.cureus.com/",
    aimsScopes: "Cureus is an open access medical journal with a mission to eliminate barriers to publication.",
    preferences: "Case reports, original research, technical reports, reviews"
  },
  {
    id: "19",
    journalName: "Frontiers in Psychology",
    issn: "1664-1078",
    eissn: "1664-1078",
    publisher: "Frontiers Media SA",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Leading psychology open access journal",
      "High impact in behavioral sciences",
      "Collaborative review process",
      "Strong social media presence"
    ],
    score: 86,
    apc: "$1,450",
    profileUrl: "https://www.frontiersin.org/journals/psychology",
    aimsScopes: "Frontiers in Psychology publishes rigorously peer-reviewed research across the psychological sciences.",
    preferences: "Original research, reviews, methods articles in psychology"
  },
  {
    id: "20",
    journalName: "Sustainability",
    issn: "2071-1050",
    eissn: "2071-1050",
    publisher: "MDPI AG",
    quartile: "Q1",
    accessType: "open",
    submissionFee: 0,
    matchingAnalysis: [
      "Focus on sustainable development research",
      "Multidisciplinary approach",
      "High citation rates",
      "Regular special issues"
    ],
    score: 84,
    apc: "$1,500",
    profileUrl: "https://www.mdpi.com/journal/sustainability",
    aimsScopes: "Sustainability publishes peer-reviewed research related to environmental, cultural, economic and social sustainability.",
    preferences: "Sustainability research, environmental studies, policy analysis"
  }
];
