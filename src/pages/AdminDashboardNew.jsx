import { useState, useEffect } from "react";
import { Upload, FileText, BarChart3, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { mockResearch } from "../lib/mockData";
import styles from "../styles/pages.module.css";

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("upload");
  const [researchList, setResearchList] = useState([]);

  const loadResearch = async () => {
    try {
      const resp = await fetch("http://localhost:4000/api/research");
      if (!resp.ok) throw new Error(`Failed to fetch research: ${resp.status}`);
      let json = await resp.json();
      // ensure each document has an `id` property (fallback to _id)
      json = json.map((d) => ({ ...(d || {}), id: d.id ?? d._id }));
      setResearchList(json);
    } catch (err) {
      console.error("Unable to load research list:", err);
      setResearchList([]);
    }
  };

  useEffect(() => {
    loadResearch();
  }, []);
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
            Welcome, {user?.name}
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
          <button
            onClick={() => setActiveSection("charts")}
            className={`${styles.adminNavButton} ${
              activeSection === "charts" ? styles.adminNavButtonActive : ""
            }`}
          >
            <BarChart3 size={20} />
            <span>Charts Upload</span>
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
        {activeSection === "upload" && <UploadSection onSaved={loadResearch} />}
        {activeSection === "manage" && <ManageSection researchList={researchList} onRefresh={loadResearch} />}
        {activeSection === "charts" && <ChartsSection />}
      </main>
    </div>
  );
}

function UploadSection({ onSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear().toString(),
    abstract: "",
    category: "genetics",
    tags: "",
    chartJson: "",
  });

  // helper: push formData to backend (POST /api/research)
  const [loading, setLoading] = useState(false);

  const saveResearch = async (payload) => {
    try {
      const res = await fetch("http://localhost:4000/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // prefer JSON error payloads, otherwise text
        let errorMessage = res.statusText || 'Failed to save research';
        try {
          const jsonErr = await res.json();
          errorMessage = jsonErr.error || jsonErr.message || errorMessage;
        } catch (e) {
          const text = await res.text().catch(() => null);
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    }
  };

  // when user clicks 'Save' — validate then send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic client-side validation
    if (!formData.title.trim()) return alert('Title is required');
    if (!formData.authors.trim()) return alert('Authors are required');
    // authors should resolve to at least one author
    const splitAuthors = formData.authors.split(',').map(s=>s.trim()).filter(Boolean);
    if (splitAuthors.length === 0) return alert('Provide at least one author');
    setLoading(true);
    try {
      // prepare proper payload for backend (authors -> array, tags -> array)
      const payload = {
        title: formData.title,
        authors: formData.authors.split(",").map((s) => s.trim()).filter(Boolean),
        year: formData.year,
        category: formData.category,
        abstract: formData.abstract,
        tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
        chartJson: formData.chartJson ? JSON.parse(formData.chartJson) : null,
      };

      const result = await saveResearch(payload);

      alert("Research uploaded successfully! id: " + (result.id || 'n/a'));
      // trigger parent refresh so ManageSection shows the new item
      if (typeof onSaved === 'function') onSaved();
      setFormData({
      title: "",
      authors: "",
      year: new Date().getFullYear().toString(),
      abstract: "",
      category: "genetics",
      tags: "",
      chartJson: "",
    });
    } catch (err) {
      console.error(err);
      // surface helpful message to the user
      alert(`Failed to upload research — ${err?.message || 'check console for details'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handler for uploaded JSON file — accepts only .json files, parses and auto-fills the form
  const handleFileInput = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      alert("Please select a .json file");
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      // Mapping as requested
      // dataset.citation.title → Title
      // dataset.citation.authors → Authors
      // dataset.citation.year → Year
      // dataset.source_name → Category
      // dataset.description → Abstract
      // dataset.table_name → Tags
      // columns → Chart JSON (stringified)

      const dataset = json.dataset || {};
      const citation = dataset.citation || {};

      setFormData((prev) => ({
        ...prev,
        title: citation.title || prev.title,
        authors: Array.isArray(citation.authors) ? citation.authors.join(", ") : (citation.authors || prev.authors),
        year: citation.year ? String(citation.year) : prev.year,
        category: dataset.source_name || prev.category,
        abstract: dataset.description || prev.abstract,
        tags: dataset.table_name || prev.tags,
        chartJson: json.columns ? JSON.stringify(json.columns, null, 2) : prev.chartJson,
      }));

    } catch (err) {
      console.error("JSON parse error", err);
      alert("Failed to parse JSON file. Make sure it follows the expected template.");
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

      <form onSubmit={handleSubmit} className={styles.adminForm}>
        {/* JSON file upload (accepts only .json) */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Upload JSON (template)</label>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileInput}
            className={styles.formInput}
          />
          <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: 6 }}>Select a JSON file that follows the project template — fields will auto-fill</small>
        </div>
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



        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className={styles.primaryButton}>
            <Upload size={20} />
            {loading ? 'Saving...' : 'Upload Research'}
          </button>
          <button type="button" className={styles.secondaryButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function ManageSection({ researchList = [], onRefresh } = {}) {
  return (
    <div>
      <div className={styles.adminHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className={styles.adminPageTitle}>Manage Studies</h1>
          <p className={styles.adminPageSubtitle}>
            View, edit, or remove research papers from the database.
          </p>
        </div>
        <button className={styles.primaryButton}>
          <Plus size={20} />
          Add New
        </button>
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
            {(researchList && researchList.length ? researchList : mockResearch).slice(0, 50).map((research, index) => (
              <tr key={research.id ?? research._id} style={{ borderBottom: "1px solid var(--border)", background: index % 2 === 0 ? "white" : "var(--gray-50)" }}>
                <td style={{ padding: "1rem 1.5rem", color: "var(--gray-900)", maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
                  {Array.isArray(research.authors) ? research.authors[0] : (String(research.authors || '').split(',')[0])}
                  {Array.isArray(research.authors) && research.authors.length > 1 && ` +${research.authors.length - 1}`}
                </td>
                <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                  <button style={{ padding: "0.5rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--primary-blue)" }}>
                    Edit
                  </button>
                  <button style={{ padding: "0.5rem", border: "none", background: "transparent", cursor: "pointer", color: "var(--destructive)" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChartsSection() {
  return (
    <div>
      <div className={styles.adminHeader}>
        <h1 className={styles.adminPageTitle}>Upload Chart Data</h1>
        <p className={styles.adminPageSubtitle}>
          Upload or update chart data for existing research papers.
        </p>
      </div>

      <div className={styles.adminForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Select Research Paper</label>
          <select className={styles.formSelect}>
            <option value="">Choose a research paper...</option>
            {mockResearch.map((research) => (
              <option key={research.id ?? research._id} value={research.id ?? research._id}>
                {research.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Chart Type</label>
          <select className={styles.formSelect}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="scatter">Scatter Plot</option>
          </select>
        </div>



        <div className={styles.formActions}>
          <button className={styles.primaryButton}>
            <Upload size={20} />
            Upload Chart
          </button>
          <button className={styles.secondaryButton}>Preview</button>
        </div>
      </div>
    </div>
  );
}
