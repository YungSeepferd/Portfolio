/**
 * projectGalleryValidator
 *
 * Dev-only helper that surfaces gallery items missing `aspect` hints.
 * Keeps console output grouped so it is easy to spot during development builds.
 */
export const validateGalleryMedia = (mediaItems, projectId, sectionId) => {
  if (!Array.isArray(mediaItems) || mediaItems.length === 0) {
    return;
  }

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const missing = mediaItems.filter((item) => {
    if (typeof item === 'string') {
      return false;
    }
    return item && item.type === 'image' && !item.aspect;
  });

  if (missing.length === 0) {
    return;
  }

  const galleryLabel = `${projectId || 'unknown-project'}:${sectionId || 'unknown-section'}`;
  console.groupCollapsed(`[GalleryValidator] Missing aspect hint → ${galleryLabel}`);
  missing.forEach((media, index) => {
    console.warn(`• item[${index}] src=${media?.src || 'unknown'}`);
  });
  console.groupEnd();
};

export default validateGalleryMedia;
