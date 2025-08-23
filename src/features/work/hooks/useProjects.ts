import { useCallback, useEffect, useState } from 'react';
import { Project } from '../types';

interface UseProjectsOptions {
  filter?: (project: Project) => boolean;
  sort?: (a: Project, b: Project) => number;
}

export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual data loading
      const data = await import('../data').then(m => m.default);
      
      let filteredProjects = [...data];
      
      if (options.filter) {
        filteredProjects = filteredProjects.filter(options.filter);
      }
      
      if (options.sort) {
        filteredProjects.sort(options.sort);
      }
      
      setProjects(filteredProjects);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load projects'));
    } finally {
      setIsLoading(false);
    }
  }, [options.filter, options.sort]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const refetch = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch,
  };
};
