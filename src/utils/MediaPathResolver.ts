/**
 * Enhanced MediaPathResolver utility
 * Handles resolution of media paths and type detection
 */

interface MediaTypeMap {
  [key: string]: 'image' | 'video' | 'pdf' | 'model';
}

export class MediaPathResolver {
  private readonly SUPPORTED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  private readonly SUPPORTED_VIDEO_TYPES = ['.mp4', '.webm', '.mov'];
  private readonly SUPPORTED_MODEL_TYPES = ['.gltf', '.glb'];

  private readonly EXTENSION_TO_TYPE: MediaTypeMap = {
    '.jpg': 'image',
    '.jpeg': 'image',
    '.png': 'image',
    '.gif': 'image',
    '.webp': 'image',
    '.svg': 'image',
    '.mp4': 'video',
    '.webm': 'video',
    '.mov': 'video',
    '.pdf': 'pdf',
    '.gltf': 'model',
    '.glb': 'model',
  };

  /**
   * Check if a file is an image based on its extension
   */
  public isImageType(filename: string): boolean {
    const ext = this.getExtension(filename);
    return this.SUPPORTED_IMAGE_TYPES.includes(ext);
  }

  /**
   * Check if a file is a video based on its extension
   */
  public isVideoType(filename: string): boolean {
    const ext = this.getExtension(filename);
    return this.SUPPORTED_VIDEO_TYPES.includes(ext);
  }

  /**
   * Check if a file is a 3D model based on its extension
   */
  public isModelType(filename: string): boolean {
    const ext = this.getExtension(filename);
    return this.SUPPORTED_MODEL_TYPES.includes(ext);
  }

  /**
   * Get the media type for a file based on its extension
   */
  public getMediaType(filename: string): 'image' | 'video' | 'pdf' | 'model' | undefined {
    const ext = this.getExtension(filename);
    return this.EXTENSION_TO_TYPE[ext];
  }

  /**
   * Resolve a media path to its full URL or path
   */
  public resolveMediaPath(path: string): string {
    // If it's already a URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // If it's an absolute path, return as is
    if (path.startsWith('/')) {
      return path;
    }

    // Otherwise treat as relative path
    return `/${path}`;
  }

  /**
   * Extract the file extension from a filename
   */
  private getExtension(filename: string): string {
    const extMatch = filename.match(/\.[^.]*$/);
    return extMatch ? extMatch[0].toLowerCase() : '';
  }
}

// Export a singleton instance
export const mediaResolver = new MediaPathResolver();
