import { Search } from "lucide-react";
import styles from "../styles/components.module.css";

export function SearchBar({ 
  value = "", 
  onChange, 
  placeholder = "Search research papers, authors, topics...", 
  className = "" 
}) {
  return (
    <div className={`${styles.searchBar} ${className}`}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      {value && (
        <button
          onClick={() => onChange?.("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
