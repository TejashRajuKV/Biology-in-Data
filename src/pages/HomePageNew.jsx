import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBarNew";
import { CategoryChips } from "../components/CategoryChipsNew";
import { ResearchCard } from "../components/ResearchCardNew";
import { categories } from "../lib/mockData";
import { TrendingUp, Database, Users, ArrowRight, Microscope } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import styles from "../styles/HomePage.module.css";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/research")
      .then((res) => res.json())
      .then((data) => {
        setResearchList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching research:", err);
        setLoading(false);
      });
  }, []);

  // Filter research based on search query and selected category
  const filteredResearch = researchList.filter((research) => {
    const matchesSearch =
      searchQuery === "" ||
      research.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      research.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      research.authors.some((author) =>
        author.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      research.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || research.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Show only 3 cards initially on home page
  const highlightedResearch = filteredResearch.slice(0, 3);

  // Data for about section chart
  const researchGrowthData = [
    { year: '2020', papers: 150 },
    { year: '2021', papers: 320 },
    { year: '2022', papers: 580 },
    { year: '2023', papers: 890 },
    { year: '2024', papers: 1245 },
  ];

  // Data for stats section chart
  const categoryDistributionData = [
    { category: 'Genetics', count: 245 },
    { category: 'Ecology', count: 198 },
    { category: 'Microbiology', count: 186 },
    { category: 'Neuroscience', count: 167 },
    { category: 'Other', count: 449 },
  ];

  const heroHighlights = [
    { label: "Peer-reviewed papers", value: "1.2K+" },
    { label: "Live datasets curated weekly", value: "320" },
    { label: "Collaborating institutions", value: "95" },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Immersive bio-data storytelling
          </div>
          <h1 className={styles.heroTitle}>
            Biology Research Database
          </h1>
          <p className={styles.heroSubtitle}>
            Explore cutting-edge biological research, data visualizations, and scientific discoveries 
            from leading researchers worldwide.
          </p>
          
          <div className={styles.searchContainer}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search research papers, authors, or keywords..."
              className={styles.heroSearch}
            />
          </div>

          <div className={styles.heroActions}>
            <Link to="/research" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>
              Explore Research
            </Link>
            <a href="#about" className={`${styles.heroButton} ${styles.heroButtonSecondary}`}>
              Platform tour
            </a>
          </div>

          <div className={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <div key={item.label} className={styles.highlightCard}>
                <div className={styles.highlightValue}>{item.value}</div>
                <div className={styles.highlightLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>Browse by Category</h2>
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>About Biology in Data</h2>
            <p className={styles.aboutDescription}>
              Biology in Data is a comprehensive platform designed to centralize and showcase 
              cutting-edge biological research from around the world. Our mission is to make 
              scientific discoveries more accessible and foster collaboration among researchers, 
              students, and enthusiasts.
            </p>
            <p className={styles.aboutDescription}>
              With advanced visualization tools, intuitive search capabilities, and a growing 
              collection of peer-reviewed research papers, we're building a hub where data 
              meets discovery. Join us in exploring the fascinating world of biological sciences.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className={styles.researchSection}>
        <div className={styles.researchHeader}>
          <h2 className={styles.researchTitle}>Featured Research</h2>
          <Link to="/research" className={styles.viewAllLink}>
            View All Research
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className={styles.researchGrid}>
          {highlightedResearch.map((research) => (
            <ResearchCard key={research._id} {...research} id={research._id} />
          ))}
        </div>
      </section>

      {/* Stats Section (cards only, chart removed) */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statsContent}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <Database size={48} color="#2E7D32" style={{ margin: "0 auto 1rem" }} />
                <div className={styles.statNumber}>1,245</div>
                <div className={styles.statLabel}>Research Papers</div>
              </div>
              <div className={styles.statCard}>
                <Users size={48} color="#66BB6A" style={{ margin: "0 auto 1rem" }} />
                <div className={styles.statNumber}>850+</div>
                <div className={styles.statLabel}>Contributors</div>
              </div>
              <div className={styles.statCard}>
                <Microscope size={48} color="#2E7D32" style={{ margin: "0 auto 1rem" }} />
                <div className={styles.statNumber}>15</div>
                <div className={styles.statLabel}>Research Categories</div>
              </div>
              <div className={styles.statCard}>
                <TrendingUp size={48} color="#66BB6A" style={{ margin: "0 auto 1rem" }} />
                <div className={styles.statNumber}>98%</div>
                <div className={styles.statLabel}>Citation Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
