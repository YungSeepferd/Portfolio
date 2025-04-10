import { useState, useEffect } from 'react';
import { workData } from '../components/work/data';

/**
 * Custom hook for retrieving and filtering project data
 * @param {Object} options - Configuration options
 * @returns {Object} Projects data and manipulation functions
 */
export const useProjectData = (options = {}) => {
  const { filter = 'all', limit } = options;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      setLoading(true);
      
      let filteredProjects = [...workData];
      
      // Apply category filter if not 'all'
      if (filter !== 'all') {
        filteredProjects = filteredProjects.filter(project => 
          project.categories.some(category => 
            category.toLowerCase().includes(filter.toLowerCase())
          )
        );
      }
      
      // Apply limit if specified
      if (limit && limit > 0) {
        filteredProjects = filteredProjects.slice(0, limit);
      }
      
      setProjects(filteredProjects);
      setLoading(false);
    } catch (err) {
      console.error('Error loading project data:', err);
      setError(err);
      setLoading(false);
    }
  }, [filter, limit]);
  
  return { projects, loading, error };
};
