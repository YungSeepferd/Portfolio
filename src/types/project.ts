export interface MediaItem {
  type: 'image' | 'video' | 'pdf' | 'model';
  url: string;
  thumbnail?: string;
  title?: string;
  caption?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'website' | 'documentation';
  url: string;
  title: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  categories: string[];
  technologies: string[];
  media: MediaItem[];
  links: ProjectLink[];
  date: string;
}

export interface ProjectProps {
  project: ProjectData;
}
