import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public', 'assets');

async function processDirectory(dir) {
  try {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await processDirectory(filePath);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const webpPath = filePath.replace(ext, '.webp');
          
          console.log(`Processing: ${filePath}`);
          
          // Get metadata to avoid upscaling
          const metadata = await sharp(filePath).metadata();
          const maxWidth = 1920;
          const width = metadata.width && metadata.width > maxWidth ? maxWidth : null;
          
          await sharp(filePath)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          console.log(`Created WebP: ${webpPath}`);
          
          // Delete original file
          await fs.promises.unlink(filePath);
          console.log(`Deleted original: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

async function run() {
  console.log('Starting image optimization...');
  await processDirectory(directoryPath);
  console.log('Finished image optimization.');
}

run();
