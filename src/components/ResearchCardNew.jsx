import { Link } from "react-router-dom";
import { Users, Calendar } from "lucide-react";
import styles from "../styles/components.module.css";

export function ResearchCard({
  id,
  title,
  abstract,
  authors,
  year,
  category,
  tags,
}) {
  const getCategoryClass = (cat) => {
    switch (cat) {
      case "genetics":
        return styles.categoryGenetics;
      case "microbiology":
        return styles.categoryMicrobiology;
      case "ecology":
        return styles.categoryEcology;
      default:
        return styles.categoryGenetics;
    }
  };

  return (
    <Link to={`/research/${id}`} className={styles.researchCard}>
      <div className={styles.researchCardHeader}>
        <span className={`${styles.researchCategory} ${getCategoryClass(category)}`}>
          {category}
        </span>
        <span className={styles.researchYear}>{year}</span>
      </div>

      <h3 className={styles.researchTitle}>{title}</h3>

      <p className={styles.researchAbstract}>
        {abstract.length > 150 ? `${abstract.substring(0, 150)}...` : abstract}
      </p>

      <div className={styles.researchFooter}>
        <div className={styles.researchAuthors}>
          <Users size={16} />
          <span>
            {authors[0]}
            {authors.length > 1 && ` +${authors.length - 1}`}
          </span>
        </div>

        {tags.length > 0 && (
          <div className={styles.researchTags}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.researchTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
