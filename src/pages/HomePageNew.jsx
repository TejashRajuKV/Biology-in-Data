import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBarNew";
import { CategoryChips } from "../components/CategoryChipsNew";
import { ResearchCard } from "../components/ResearchCardNew";
import { mockResearch, categories } from "../lib/mockData";
import { TrendingUp, Database, Users, ArrowRight, Microscope } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import styles from "../styles/HomePage.module.css";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [researchData, setResearchData] = useState([]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/research");
        if (response.ok) {
          const data = await response.json();
          setResearchData(data);
        } else {
          setResearchData(mockResearch);
        }
      } catch (error) {
        console.error("Error fetching research:", error);
        setResearchData(mockResearch);
      }
    };
    fetchResearch();
  }, []);

  // Filter research based on search query and selected category
  const filteredResearch = researchData.filter((research) => {
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

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
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
            />
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
      <section className={styles.aboutSection}>
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
          <div className={styles.aboutChart}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={researchGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" stroke="#5a6c7d" />
                <YAxis stroke="#5a6c7d" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'white', 
                    border: '2px solid #66BB6A',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="papers" 
                  stroke="#2E7D32" 
                  strokeWidth={3}
                  dot={{ fill: '#66BB6A', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
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
            <ResearchCard key={research.id} {...research} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
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
            <div className={styles.statsChart}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#5a6c7d"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#5a6c7d" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'white', 
                      border: '2px solid #66BB6A',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="count" fill="#2E7D32" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
