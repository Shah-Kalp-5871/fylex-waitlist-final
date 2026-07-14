import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file in the browser before uploading.
 * It targets a maximum size of 1MB and a max width/height of 1920px.
 *
 * @param file The original image File object
 * @returns A promise that resolves to the compressed File object
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1, // Target size is 1MB
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    // return a new File object so it maintains the correct name but with .webp extension
    const newName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
    return new File([compressedFile], newName, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Error compressing image:", error);
    // Fallback to original file if compression fails
    return file;
  }
}
