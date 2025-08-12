import { ProjectSchema, MediaItemSchema, type Project, type MediaItem } from '../schemas/project';
import { resolveMediaPath, isVideo } from '../services/ImageService';

// Ensure media item has defaults and resolved paths
export const normalizeMediaItem = (item: any): MediaItem => {
  const obj = typeof item === 'string' ? { src: item } : item || {};
  const type = obj.type || (isVideo(obj.src) ? 'video' : 'image');
  const aspect = obj.aspect || 'landscape';
  const normalized = {
    ...obj,
    type,
    src: resolveMediaPath(obj.src),
    poster: obj.poster ? resolveMediaPath(obj.poster) : undefined,
    thumbnail: obj.thumbnail ? resolveMediaPath(obj.thumbnail) : undefined,
    aspect,
  };
  return MediaItemSchema.parse(normalized);
};

export const toArray = <T>(maybe: T | T[] | undefined | null): T[] => {
  if (!maybe) return [];
  return Array.isArray(maybe) ? maybe : [maybe];
};

export const getPrimaryMediaItem = (project: any): MediaItem | null => {
  const mediaArray = toArray(project.media).map(normalizeMediaItem);
  if (mediaArray.length > 0) return mediaArray[0];
  // Backwards compatibility fallbacks
  if (project.featuredImages?.overview) return normalizeMediaItem(project.featuredImages.overview);
  if (project.galleryImages?.length) return normalizeMediaItem(project.galleryImages[0]);
  if (project.heroImage) return normalizeMediaItem(project.heroImage);
  if (project.heroVideo) return normalizeMediaItem({ type: 'video', src: project.heroVideo });
  return null;
};

export const normalizeProject = (raw: any): Project => {
  // Normalize media
  const mediaArray = toArray(raw.media).map(normalizeMediaItem);

  // Normalize sections and their media/items
  const sections = (raw.sections || []).map((section: any, idx: number) => {
    const s: any = { ...section };
    s.id = s.id || `section-${idx}`;
    if (s.media) s.media = toArray(s.media).map(normalizeMediaItem);
    if (s.items) s.items = toArray(s.items).map(normalizeMediaItem);
    return s;
  });

  const normalized = {
    ...raw,
    media: mediaArray,
    sections,
    links: Array.isArray(raw.links) ? raw.links : [],
    categories: Array.isArray(raw.categories) ? raw.categories : [],
    technologies: Array.isArray(raw.technologies) ? raw.technologies : [],
  };

  // Validate against schema
  return ProjectSchema.parse(normalized);
};

export const normalizeProjects = (list: any[]): Project[] => list.map(normalizeProject);

export default normalizeProject;
