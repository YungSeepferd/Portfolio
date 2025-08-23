import { ReactNode } from 'react';

/**
 * Work Feature Types
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  thumbnail: string;
  sections: ProjectSection[];
  links?: ProjectLink[];
  tech?: string[];
  prototype?: PrototypeData;
  relatedProjects?: string[];
}

export interface ProjectSection {
  id: string;
  type: 'default' | 'gallery' | 'outcomes' | 'takeaways' | 'prototype' | 'custom';
  title: string;
  subtitle?: string;
  content?: ReactNode;
  media?: ProjectMedia | ProjectMedia[];
  layout?: 'textLeft' | 'textRight' | 'textOnly' | 'mediaOnly' | 'gallery';
  takeaways?: string[];
  outcomes?: {
    title: string;
    points: string[];
  };
  actions?: ProjectAction[];
  anchor?: string;
  navigable?: boolean;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  aspect?: 'portrait' | 'landscape' | 'square';
  poster?: string;
}

export interface ProjectLink {
  type: string;
  url: string;
  label: string;
  icon?: string;
}

export interface ProjectAction {
  label: string;
  onClick: () => void;
  icon?: string;
}

export interface PrototypeData {
  url: string;
  type: 'figma' | 'video' | 'iframe';
  title: string;
  description?: string;
}
