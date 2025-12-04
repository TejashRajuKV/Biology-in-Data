import { useState, useEffect } from "react";
import { SearchBar } from "../components/SearchBarNew";
import { ResearchCard } from "../components/ResearchCardNew";
import { categories } from "../lib/mockData";
import { Filter, Grid, List } from "lucide-react";
import styles from "../styles/ResearchListPage.module.css";

export function ResearchListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
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

  const filteredResearch = researchList.filter((research) => {
    const matchesSearch =
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

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterCard}>
            <div className={styles.filterHeader}>
              <Filter className={styles.filterIcon} size={20} />
              <span>Filters</span>
            </div>

            {/* Category Filters */}
            <div className={styles.filterSection}>
              <h4 className={styles.filterTitle}>Categories</h4>
              <div className={styles.categoryList}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category.id
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                  >
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className={styles.filterSection}>
              <h4 className={styles.filterTitle}>Year</h4>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>2024</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>2023</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.contentArea}>
          {/* Search and View Toggle */}
          <div className={styles.searchRow}>
            <div className={styles.searchWrapper}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by title, author, or keyword..."
              />
            </div>
            <div className={styles.viewToggle}>
              <button
                onClick={() => setViewMode("grid")}
                className={`${styles.viewButton} ${
                  viewMode === "grid" ? styles.viewButtonActive : ""
                }`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`${styles.viewButton} ${
                  viewMode === "list" ? styles.viewButtonActive : ""
                }`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className={styles.resultsCount}>
            {loading ? (
              "Loading research..."
            ) : (
              <>
                Found {filteredResearch.length} research{" "}
                {filteredResearch.length === 1 ? "paper" : "papers"}
              </>
            )}
          </div>

          {/* Research Grid/List */}
          {loading ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>Loading...</p>
            </div>
          ) : filteredResearch.length > 0 ? (
            <div
              className={
                viewMode === "grid" ? styles.researchGrid : styles.researchList
              }
            >
              {filteredResearch.map((research) => (
                <ResearchCard key={research._id} {...research} id={research._id} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>
                No research papers found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className={styles.clearButton}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredResearch.length > 0 && (
            <div className={styles.pagination}>
              <button className={styles.pageButton}>Previous</button>
              <button className={`${styles.pageButton} ${styles.pageButtonActive}`}>
                1
              </button>
              <button className={styles.pageButton}>2</button>
              <button className={styles.pageButton}>3</button>
              <button className={styles.pageButton}>Next</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
