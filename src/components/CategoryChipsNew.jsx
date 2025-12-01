import styles from "../styles/components.module.css";

export function CategoryChips({ categories, selectedCategory, onSelectCategory }) {
  return (
    <>
      {/* Desktop View - Chips */}
      <div className={styles.categoryChips}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`${styles.categoryChip} ${
              selectedCategory === category.id ? styles.categoryChipActive : ""
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
      
      {/* Mobile View - Dropdown */}
      <div className={styles.categoryDropdown}>
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className={styles.categorySelect}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
