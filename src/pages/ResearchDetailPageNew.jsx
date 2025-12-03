import { useParams, Link } from "react-router-dom";
import { mockResearch, references } from "../lib/mockData";
import { ChartFrame } from "../components/ChartFrame";
import { ArrowLeft, Calendar, Users, Tag, ExternalLink, Bookmark } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import styles from "../styles/pages.module.css";

export function ResearchDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/research");
        if (response.ok) {
          const data = await response.json();
          const foundResearch = data.find((r) => r._id === id);
          setResearch(foundResearch || mockResearch.find((r) => r.id === id));
        } else {
          setResearch(mockResearch.find((r) => r.id === id));
        }
      } catch (error) {
        console.error("Error fetching research:", error);
        setResearch(mockResearch.find((r) => r.id === id));
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, [id]);

  if (!research) {
    return (
      <div className={styles.detailContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h2>Research not found</h2>
          <Link to="/research" className={styles.backLink}>
            ← Back to research list
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryClass = (category) => {
    switch (category) {
      case "genetics":
        return styles.badgeGenetics;
      case "microbiology":
        return styles.badgeMicrobiology;
      case "ecology":
        return styles.badgeEcology;
      default:
        return styles.badgeGenetics;
    }
  };

  const handleSaveResearch = () => {
    if (isAuthenticated) {
      setIsSaved(!isSaved);
      // In production, this would save to backend/Supabase
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className={styles.detailContainer}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <div className={styles.detailHeaderContent}>
          <div className={styles.headerTopRow}>
            <Link to="/research" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to research
            </Link>

            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button
                onClick={handleSaveResearch}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: isSaved ? "var(--deep-forest)" : "white",
                  color: isSaved ? "white" : "var(--deep-forest)",
                  border: "2px solid var(--deep-forest)",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: 500,
                }}
              >
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                {isSaved ? "Saved" : "Save"}
              </button>
              
              <div className={`${styles.categoryBadge} ${getCategoryClass(research.category)}`}>
                {research.category}
              </div>
            </div>
          </div>

          <h1 className={styles.detailTitle}>{research.title}</h1>

          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <Users size={20} />
              <span>{research.authors.join(", ")}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={20} />
              <span>{research.year}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Panel Content Layout */}
      <div className={styles.twoPanelLayout}>
        {/* Left Panel - Content */}
        <div className={styles.leftPanel}>
          {/* Description */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Research Overview</h2>
            <p className={styles.overviewText}>{research.abstract}</p>
          </section>

          {/* Key Findings */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Findings</h2>
            <div className={styles.findingsList}>
              <div className={styles.findingsItem}>
                <span className={styles.bullet}>•</span>
                <span>Significant improvements in target metrics under experimental conditions</span>
              </div>
              <div className={styles.findingsItem}>
                <span className={styles.bullet}>•</span>
                <span>Novel mechanisms identified through advanced analytical techniques</span>
              </div>
              <div className={styles.findingsItem}>
                <span className={styles.bullet}>•</span>
                <span>Potential applications for practical implementation in the field</span>
              </div>
              <div className={styles.findingsItem}>
                <span className={styles.bullet}>•</span>
                <span>Results validated through multiple independent verification methods</span>
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Methodology</h2>
            <p className={styles.methodologyText}>
              The research methodology employed state-of-the-art techniques and rigorous experimental protocols.
              Sample collection followed standardized procedures, and all data was collected under controlled conditions
              to ensure reproducibility and scientific validity.
            </p>
            <p className={styles.methodologyText}>
              Statistical analysis was performed using industry-standard software packages, with significance levels
              set at p &lt; 0.05. All experiments were conducted in triplicate to ensure reliability of results.
            </p>
          </section>

          {/* Tags */}
          <section className={styles.section}>
            <h3 className={styles.sectionSubtitle}>Keywords</h3>
            <div className={styles.keywordsList}>
              {research.tags.map((tag) => (
                <span key={tag} className={styles.keywordTag}>
                  <Tag size={16} />
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* References */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>References</h2>
            <div className={styles.referencesList}>
              {references.map((ref, index) => (
                <div key={index} className={styles.referenceItem}>
                  <span className={styles.referenceNumber}>[{index + 1}]</span>
                  <span>{ref}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Citation Box */}
          <section className={styles.section}>
            <h3 className={styles.sectionSubtitle}>Cite This Research</h3>
            <div className={styles.citationBox}>
              <div className={styles.citationText}>
                {(() => {
                  const firstAuthor = research.authors[0];
                  const lastName = firstAuthor.split(" ").pop();
                  return `${lastName}, et al. (${research.year}). ${research.title}.`;
                })()}
                <em> Biology in Data</em>.
              </div>
              <button className={styles.exportButton}>
                <ExternalLink size={16} />
                Export Citation
              </button>
            </div>
          </section>
        </div>

        {/* Right Panel - Visualization */}
        <div className={styles.rightPanel}>
          {/* Interactive Chart */}
          {research.chartData && (
            <section className={styles.section}>
              <ChartFrame
                data={research.chartData.data}
                type={research.chartData.type}
                title={`${research.title.split(":")[0]} - Results`}
              />
              <div className={styles.infoBox}>
                <p>
                  <strong>Figure 1:</strong> Interactive data visualization showing key findings from this research.
                  Use the download buttons above to export the raw data or save the figure.
                </p>
              </div>
            </section>
          )}

          {/* Related Research */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Related Research</h2>
            <div className={styles.relatedList}>
              {mockResearch
                .filter((r) => r.id !== id && r.category === research.category)
                .slice(0, 3)
                .map((relatedResearch) => (
                  <Link
                    key={relatedResearch.id}
                    to={`/research/${relatedResearch.id}`}
                    className={styles.relatedCard}
                  >
                    <h4 className={styles.relatedCardTitle}>
                      {relatedResearch.title}
                    </h4>
                    <p className={styles.relatedCardText}>
                      {relatedResearch.abstract.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}