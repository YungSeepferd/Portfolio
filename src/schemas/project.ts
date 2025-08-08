import { z } from 'zod';

// MediaItem schema
export const MediaItemSchema = z.object({
  type: z.enum(['image', 'video', 'iframe']).default('image'),
  src: z.string().min(1),
  alt: z.string().optional(),
  aspect: z.enum(['landscape', 'portrait', 'square']).optional(),
  poster: z.string().optional(),
  title: z.string().optional(),
  thumbnail: z.string().optional(),
});

// LinkItem schema
export const LinkItemSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
  icon: z.any().optional(),
  contentType: z.enum(['pdf', 'iframe', 'external']).optional(),
  openInPopup: z.boolean().optional(),
});

// ProjectSection schema
export const ProjectSectionSchema = z.object({
  id: z.string().optional(),
  type: z.string().default('default'),
  title: z.string().optional(),
  content: z.any().optional(),
  media: z.union([MediaItemSchema, MediaItemSchema.array()]).optional(),
  items: MediaItemSchema.array().optional(),
  layout: z.string().optional(),
  anchor: z.string().optional(),
  navigable: z.boolean().optional(),
});

// Project schema
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().default(''),
  shortDescription: z.string().optional(),
  categories: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  media: z.union([MediaItemSchema, MediaItemSchema.array()]).optional(),
  links: z.array(LinkItemSchema).default([]),
  date: z.string().optional(),
  sections: z.array(ProjectSectionSchema).default([]),
  // Allow common MUI palette variants plus legacy values used in data
  cardVariant: z
    .enum(['default', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'image'])
    .optional(),
});

export type MediaItem = z.infer<typeof MediaItemSchema>;
export type LinkItem = z.infer<typeof LinkItemSchema>;
export type ProjectSection = z.infer<typeof ProjectSectionSchema>;
export type Project = z.infer<typeof ProjectSchema>;
