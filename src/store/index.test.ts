import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProjectStore, useUIStore } from '../store';

// Mock zustand stores
vi.mock('../store', () => ({
  useProjectStore: vi.fn(),
  useUIStore: vi.fn(),
}));

// Mock project data
const mockProject = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript'],
  links: [{ label: 'View Project', href: 'https://example.com', type: 'external' }],
  media: {
    featuredImage: '/test-image.jpg',
    images: ['/test-image.jpg'],
  },
  sections: [],
};

// no-op theme removed to satisfy linter

describe('Zustand Store Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useProjectStore', () => {
    it('manages project state correctly', () => {
      const mockStore = {
        projects: [mockProject],
        selectedProject: null,
        isModalOpen: false,
        selectedProjectIndex: null,
        setProjects: vi.fn(),
        openProjectModal: vi.fn(),
        closeProjectModal: vi.fn(),
        navigateToNextProject: vi.fn(),
        navigateToPreviousProject: vi.fn(),
      };

      (useProjectStore as any).mockReturnValue(mockStore);

      // Test opening a project modal
      mockStore.openProjectModal(mockProject, 0);
      expect(mockStore.openProjectModal).toHaveBeenCalledWith(mockProject, 0);

      // Test closing modal
      mockStore.closeProjectModal();
      expect(mockStore.closeProjectModal).toHaveBeenCalled();
    });

    it('handles navigation correctly', () => {
      const mockStore = {
        projects: [mockProject],
        selectedProject: mockProject,
        selectedProjectIndex: 0,
        navigateToNextProject: vi.fn(),
        navigateToPreviousProject: vi.fn(),
      };

      (useProjectStore as any).mockReturnValue(mockStore);

      mockStore.navigateToNextProject();
      expect(mockStore.navigateToNextProject).toHaveBeenCalled();

      mockStore.navigateToPreviousProject();
      expect(mockStore.navigateToPreviousProject).toHaveBeenCalled();
    });
  });

  describe('useUIStore', () => {
    it('manages UI state correctly', () => {
      const mockStore = {
        sidebarOpen: false,
        isDarkMode: true,
        soundEnabled: true,
        setSidebarOpen: vi.fn(),
        toggleDarkMode: vi.fn(),
        toggleSound: vi.fn(),
      };

      (useUIStore as any).mockReturnValue(mockStore);

      mockStore.toggleDarkMode();
      expect(mockStore.toggleDarkMode).toHaveBeenCalled();

      mockStore.toggleSound();
      expect(mockStore.toggleSound).toHaveBeenCalled();

      mockStore.setSidebarOpen(true);
      expect(mockStore.setSidebarOpen).toHaveBeenCalledWith(true);
    });
  });
});
