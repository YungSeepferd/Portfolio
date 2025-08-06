import React, { ReactNode } from 'react';

// Project related types
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  categories: string[];
  technologies: string[];
  media?: MediaItem | MediaItem[];
  links: LinkItem[];
  date: string;
  sections?: ProjectSection[];
  cardVariant?: 'default' | 'primary' | 'secondary' | 'info';
}

export interface MediaItem {
  type: 'image' | 'video' | 'iframe';
  src: string;
  alt?: string;
  aspect?: string;
  poster?: string;
  title?: string;
}

export interface LinkItem {
  label: string;
  url: string;
  icon?: ReactNode;
  contentType?: 'pdf' | 'iframe' | 'external';
  openInPopup?: boolean;
}

export interface ProjectSection {
  id: string;
  type: string;
  title: string;
  content?: ReactNode;
  media?: MediaItem | MediaItem[];
  layout?: string;
  anchor?: string;
  navigable?: boolean;
}

// Theme related types
export interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
  theme: any; // MUI Theme type
}

// Modal related types
export interface ModalContextType {
  openPdfModal: (url: string, title?: string) => void;
  openIframeModal: (url: string, title?: string) => void;
  closePdfModal: () => void;
  closeIframeModal: () => void;
  pdfModal: {
    open: boolean;
    url: string;
    title: string;
  };
  iframeModal: {
    open: boolean;
    url: string;
    title: string;
  };
}

// Error boundary types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  fallback?: ReactNode;
}

// API types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
}

// Sound types
export interface SoundConfig {
  enabled: boolean;
  volume: number;
  effects: {
    click: boolean;
    hover: boolean;
    navigation: boolean;
  };
}

export default {};
