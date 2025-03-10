import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectFilter.module.css';

/**
 * ProjectFilter displays category tags and allows the user to filter projects.
 * Props:
 *   - categories: Array of unique category strings.
 *   - selectedCategory: Currently selected category (null means all).
 *   - onSelect: Function(category) to call when a category is selected.
 */
const ProjectFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className={styles.filterContainer} role="navigation" aria-label="Project categories">
      <button 
        className={`${styles.filterButton} ${selectedCategory === null ? styles.active : ''}`}
        onClick={() => onSelect(null)}
        aria-label="Show all projects">
        All
      </button>
      {categories.map((cat, idx) => (
        <button 
          key={idx}
          className={`${styles.filterButton} ${selectedCategory === cat ? styles.active : ''}`}
          onClick={() => onSelect(cat)}
          aria-label={`Show projects in ${cat}`}>
          {cat}
        </button>
      ))}
    </div>
  );
};

ProjectFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ProjectFilter;