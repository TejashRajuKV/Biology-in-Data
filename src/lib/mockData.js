export const mockResearch = [
  {
    id: "1",
    title: "CRISPR-Cas9 Gene Editing in Arabidopsis thaliana: Enhancing Drought Resistance",
    authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Emma Thompson"],
    year: 2024,
    abstract: "This study explores the application of CRISPR-Cas9 technology to enhance drought resistance in Arabidopsis thaliana. We identified three key genes involved in water retention and successfully modified their expression patterns. Our results show a 40% improvement in drought tolerance under controlled conditions.",
    category: "genetics",
    tags: ["CRISPR", "drought resistance", "plant biology", "gene editing"],
    chartData: {
      type: "line",
      data: [
        { week: "Week 1", control: 100, modified: 100 },
        { week: "Week 2", control: 85, modified: 95 },
        { week: "Week 3", control: 65, modified: 88 },
        { week: "Week 4", control: 40, modified: 75 },
        { week: "Week 5", control: 20, modified: 60 },
      ]
    }
  },
  {
    id: "2",
    title: "Microbial Diversity in Arctic Permafrost: Implications for Climate Change",
    authors: ["Dr. Anna Petrov", "Dr. James Lee"],
    year: 2024,
    abstract: "We analyzed microbial communities in Arctic permafrost samples from depths of 1-5 meters. Using metagenomic sequencing, we identified over 2,000 previously unknown bacterial species. Our findings suggest these microbes play a crucial role in methane production as permafrost thaws.",
    category: "microbiology",
    tags: ["Arctic", "permafrost", "metagenomics", "climate change"],
    chartData: {
      type: "bar",
      data: [
        { depth: "1m", species: 450 },
        { depth: "2m", species: 580 },
        { depth: "3m", species: 720 },
        { depth: "4m", species: 650 },
        { depth: "5m", species: 600 },
      ]
    }
  },
  {
    id: "3",
    title: "Forest Fragmentation Effects on Pollinator Networks in Tropical Ecosystems",
    authors: ["Dr. Maria Santos", "Dr. Kevin O'Brien", "Dr. Yuki Tanaka"],
    year: 2023,
    abstract: "This longitudinal study examines how forest fragmentation affects plant-pollinator networks in Southeast Asian rainforests. We monitored 150 plant species and their pollinators across fragmented and continuous forest areas over three years, revealing significant disruptions in network stability.",
    category: "ecology",
    tags: ["pollination", "forest fragmentation", "biodiversity", "tropical ecology"],
    chartData: {
      type: "scatter",
      data: [
        { fragmentation: 10, networkStability: 0.92 },
        { fragmentation: 25, networkStability: 0.85 },
        { fragmentation: 40, networkStability: 0.71 },
        { fragmentation: 60, networkStability: 0.58 },
        { fragmentation: 80, networkStability: 0.42 },
      ]
    }
  },
  {
    id: "4",
    title: "Evolutionary Genomics of Antibiotic Resistance in Hospital Pathogens",
    authors: ["Dr. Rachel Kim", "Dr. Thomas Mueller"],
    year: 2024,
    abstract: "We sequenced the genomes of 500 hospital-acquired infections to track the evolution of antibiotic resistance. Our analysis reveals horizontal gene transfer events and identifies key resistance mechanisms that could inform treatment strategies.",
    category: "genetics",
    tags: ["antibiotic resistance", "genomics", "evolution", "healthcare"],
  },
  {
    id: "5",
    title: "Soil Microbiome Composition and Plant Health in Organic vs Conventional Farms",
    authors: ["Dr. Lisa Anderson", "Dr. Carlos Gomez"],
    year: 2023,
    abstract: "Comparative analysis of soil microbiomes from 30 organic and 30 conventional farms reveals distinct microbial community structures. Organic farms showed 35% higher microbial diversity, correlating with improved plant disease resistance.",
    category: "microbiology",
    tags: ["soil health", "organic farming", "microbiome", "agriculture"],
  },
  {
    id: "6",
    title: "Coral Reef Resilience: Symbiotic Relationships Under Ocean Acidification",
    authors: ["Dr. David Zhang", "Dr. Sophie Martin", "Dr. Ahmed Hassan"],
    year: 2024,
    abstract: "This study investigates how ocean acidification affects coral-algae symbiotic relationships. We exposed coral specimens to varying pH levels and monitored photosynthetic efficiency, revealing adaptive mechanisms in certain coral species.",
    category: "ecology",
    tags: ["coral reefs", "ocean acidification", "symbiosis", "climate change"],
  },
];

export const categories = [
  { id: "all", name: "All Research", count: mockResearch.length },
  { id: "genetics", name: "Genetics", count: mockResearch.filter(r => r.category === "genetics").length },
  { id: "microbiology", name: "Microbiology", count: mockResearch.filter(r => r.category === "microbiology").length },
  { id: "ecology", name: "Ecology", count: mockResearch.filter(r => r.category === "ecology").length },
];

export const references = [
  "Smith, J. et al. (2023). Gene editing fundamentals. Nature Genetics, 45(3), 234-245.",
  "Johnson, M. & Lee, K. (2022). Modern approaches to plant biology. Plant Cell, 34(8), 1456-1470.",
  "Anderson, R. et al. (2023). Climate adaptation in agriculture. Science, 379(6632), 567-572.",
];
