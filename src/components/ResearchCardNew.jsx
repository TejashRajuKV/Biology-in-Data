import { Link } from "react-router-dom";
import { Users, Calendar, ArrowRight, Sparkles } from "lucide-react";
import styles from "../styles/components.module.css";

export function ResearchCard({
  id,
  _id,
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

  const linkId = id || _id;

  return (
    <Link to={`/research/${linkId}`} className={styles.researchCard}>
      <div className={styles.researchCardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={14} style={{ color: 'var(--secondary)' }} />
          <span className={`${styles.researchCategory} ${getCategoryClass(category)}`}>
            {category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
          <Calendar size={14} />
          <span className={styles.researchYear}>{year}</span>
        </div>
      </div>

      <h3 className={styles.researchTitle}>{title}</h3>

      <p className={styles.researchAbstract}>
        {abstract.length > 160 ? `${abstract.substring(0, 160)}...` : abstract}
      </p>

      <div className={styles.researchFooter}>
        <div className={styles.researchAuthors}>
          <Users size={16} />
          <span>
            {authors[0]}
            {authors.length > 1 && ` +${authors.length - 1} more`}
          </span>
        </div>

        {tags.length > 0 && (
          <div className={styles.researchTags}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.researchTag}>
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className={styles.researchTag} style={{ opacity: 0.7 }}>
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginTop: '1rem',
          color: 'var(--primary)',
          fontSize: '0.875rem',
          fontWeight: '600',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }} className="read-more-indicator">
          Read more <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
