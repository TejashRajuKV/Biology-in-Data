import { useState, useEffect } from "react";
import { Upload, FileText, BarChart3, Plus, LogOut, FileJson, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { mockResearch } from "../lib/mockData";
import styles from "../styles/pages.module.css";
import * as XLSX from "xlsx";
import { ChartFrame } from "../components/ChartFrame";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("upload");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.adminSidebar}>
        <div>
          <h2 className={styles.adminTitle}>Admin Panel</h2>
          <p style={{ padding: "0 1.5rem", color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
            Welcome, {user?.name || "Admin"}
          </p>
        </div>

        <nav className={styles.adminNav}>
          <button
            onClick={() => setActiveSection("upload")}
            className={`${styles.adminNavButton} ${
              activeSection === "upload" ? styles.adminNavButtonActive : ""
            }`}
          >
            <Upload size={20} />
            <span>Upload Research</span>
          </button>
          <button
            onClick={() => setActiveSection("manage")}
            className={`${styles.adminNavButton} ${
              activeSection === "manage" ? styles.adminNavButtonActive : ""
            }`}
          >
            <FileText size={20} />
            <span>Manage Studies</span>
          </button>
        </nav>

        <div style={{ padding: "1rem", marginTop: "auto" }}>
          <button onClick={handleLogout} className={styles.logoutButtonFull}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.adminMain}>
        {activeSection === "upload" && <UploadSection />}
        {activeSection === "manage" && <ManageSection />}
      </main>
    </div>
  );
}

function UploadSection() {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear().toString(),
    abstract: "",
    category: "genetics",
    tags: "",
    chartJson: "",
  });
  const [parsedChartData, setParsedChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update parsedChartData whenever chartJson string changes
  useEffect(() => {
    try {
      if (formData.chartJson) {
        const parsed = JSON.parse(formData.chartJson);
        setParsedChartData(parsed);
      } else {
        setParsedChartData(null);
      }
    } catch (e) {
      // Invalid JSON, ignore for preview until valid
    }
  }, [formData.chartJson]);

  const handleJsonUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const raw = event.target?.result;
        if (!raw) throw new Error("Empty file");

        const parsed = JSON.parse(raw);

        // Support different JSON shapes: a single research object, an array,
        // or an object with a nested `research` field.
        let json = parsed;
        if (Array.isArray(parsed)) {
          json = parsed[0] || {};
        } else if (parsed && typeof parsed === "object" && parsed.research) {
          json = parsed.research;
        }

        // Find chart config in common fields: chartData, chartJson, chart, or data-only.
        let chartConfig = json.chartData || json.chartJson || json.chart || null;

        // If backend stored chartJson as a string, parse it first
        if (typeof chartConfig === "string") {
          try {
            chartConfig = JSON.parse(chartConfig);
          } catch {
            // leave as-is if it is not valid JSON
          }
        }

        if (!chartConfig && Array.isArray(json.data)) {
          chartConfig = { type: "line", data: json.data };
        }
        if (Array.isArray(chartConfig)) {
          chartConfig = { type: "line", data: chartConfig };
        }

        setFormData({
          title: json.title || "",
          authors: Array.isArray(json.authors) ? json.authors.join(", ") : json.authors || "",
          year: (json.year && String(json.year)) || new Date().getFullYear().toString(),
          abstract: json.abstract || "",
          category: json.category || "genetics",
          tags: Array.isArray(json.tags) ? json.tags.join(", ") : json.tags || "",
          chartJson: chartConfig ? JSON.stringify(chartConfig, null, 2) : "",
        });

        // Allow selecting the same file again if needed.
        e.target.value = "";
        alert("Research details loaded from JSON!");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleDataUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Basic heuristic to guess chart type and structure
        // Defaulting to line chart with first column as X and others as lines
        const chartData = {
          type: "line",
          data: data
        };

        setFormData(prev => ({
          ...prev,
          chartJson: JSON.stringify(chartData, null, 2)
        }));
        alert("Chart data loaded from file!");
      } catch (error) {
        console.error("Error parsing data file:", error);
        alert("Error parsing CSV/Excel file.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        authors: formData.authors.split(",").map(a => a.trim()),
        tags: formData.tags.split(",").map(t => t.trim()),
        chartJson: formData.chartJson ? JSON.parse(formData.chartJson) : null
      };

      const response = await fetch("http://localhost:4000/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Research uploaded successfully!");
        setFormData({
          title: "",
          authors: "",
          year: new Date().getFullYear().toString(),
          abstract: "",
          category: "genetics",
          tags: "",
          chartJson: "",
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error uploading research:", error);
      alert("Failed to upload research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminPageTitle}>Upload New Research</h1>
        <p className={styles.adminPageSubtitle}>
          Add a new research paper to the Biology in Data database.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Left Column: Form */}
        <div>
          {/* File Upload Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            <label className={styles.fileUploadButton}>
              <FileJson size={18} />
              <span>Load JSON</span>
              <input type="file" accept=".json" onChange={handleJsonUpload} style={{ display: "none" }} />
            </label>
            <label className={styles.fileUploadButton}>
              <FileSpreadsheet size={18} />
              <span>Load Data (CSV/Excel)</span>
              <input type="file" accept=".csv, .xlsx, .xls" onChange={handleDataUpload} style={{ display: "none" }} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className={styles.adminForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={styles.formInput}
                placeholder="Enter research paper title"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Authors *</label>
              <input
                type="text"
                required
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                className={styles.formInput}
                placeholder="Dr. Jane Smith, Dr. John Doe (comma separated)"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Year *</label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className={styles.formInput}
                  placeholder="2024"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={styles.formSelect}
                >
                  <option value="genetics">Genetics</option>
                  <option value="microbiology">Microbiology</option>
                  <option value="ecology">Ecology</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Abstract *</label>
              <textarea
                required
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                rows={6}
                className={styles.formTextarea}
                placeholder="Enter the research abstract..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className={styles.formInput}
                placeholder="CRISPR, gene editing, plant biology (comma separated)"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Chart Data (JSON)</label>
              <textarea
                value={formData.chartJson}
                onChange={(e) => setFormData({ ...formData, chartJson: e.target.value })}
                rows={6}
                className={styles.formTextarea}
                placeholder='{"type": "line", "data": [...]}'
                style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryButton} disabled={loading}>
                <Upload size={20} />
                {loading ? "Uploading..." : "Upload Research"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Preview */}
        <div>
          <h3 className={styles.sectionSubtitle} style={{ marginBottom: "1rem" }}>Chart Preview</h3>
          <div style={{ 
            background: "white", 
            borderRadius: "0.75rem", 
            border: "1px solid var(--border)", 
            padding: "1rem",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column"
          }}>
            {parsedChartData ? (
              <ChartFrame
                data={parsedChartData.data}
                type={parsedChartData.type || "line"}
                title={formData.title || "Chart Preview"}
              />
            ) : (
              <div style={{ 
                flex: 1, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "var(--text-muted)",
                flexDirection: "column",
                gap: "1rem"
              }}>
                <BarChart3 size={48} style={{ opacity: 0.2 }} />
                <p>Enter valid chart JSON or upload a data file to see a preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageSection() {
  const [researchList, setResearchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/research")
      .then(res => res.json())
      .then(data => {
        setResearchList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching research:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this research?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/research/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setResearchList(researchList.filter(r => r._id !== id));
      } else {
        alert("Failed to delete research");
      }
    } catch (err) {
      console.error("Error deleting research:", err);
    }
  };

  return (
    <div>
      <div className={styles.adminHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className={styles.adminPageTitle}>Manage Studies</h1>
          <p className={styles.adminPageSubtitle}>
            View, edit, or remove research papers from the database.
          </p>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "0.75rem", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "var(--blue-50)", borderBottom: "1px solid var(--border)" }}>
            <tr>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--gray-900)", fontWeight: 600 }}>Title</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--gray-900)", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--gray-900)", fontWeight: 600 }}>Year</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "left", color: "var(--gray-900)", fontWeight: 600 }}>Authors</th>
              <th style={{ padding: "1rem 1.5rem", textAlign: "right", color: "var(--gray-900)", fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ padding: "2rem", textAlign: "center" }}>Loading...</td></tr>
            ) : researchList.length === 0 ? (
              <tr><td colSpan="5" style={{ padding: "2rem", textAlign: "center" }}>No research found.</td></tr>
            ) : (
              researchList.map((research, index) => (
                <tr key={research._id} style={{ borderBottom: "1px solid var(--border)", background: index % 2 === 0 ? "white" : "var(--gray-50)" }}>
                  <td style={{ padding: "1rem 1.5rem", color: "var(--gray-900)", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {research.title}
                  </td>
                  <td style={{ padding: "1rem 1.5rem" }}>
                    <span style={{
                      padding: "0.375rem 0.75rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      background: research.category === "genetics" ? "var(--green-100)" : research.category === "microbiology" ? "var(--blue-100)" : "var(--green-100)",
                      color: research.category === "genetics" ? "var(--green-700)" : research.category === "microbiology" ? "var(--blue-700)" : "var(--green-700)"
                    }}>
                      {research.category}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.5rem", color: "var(--gray-600)" }}>{research.year}</td>
                  <td style={{ padding: "1rem 1.5rem", color: "var(--gray-600)", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {research.authors.join(", ")}
                  </td>
                  <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                    <button 
                      onClick={() => handleDelete(research._id)}
                      style={{ padding: "0.5rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--destructive)" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
