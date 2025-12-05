import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const MAX_SIZE_MB = 1.0; // Images larger than this will be optimized
const QUALITY = 85; // JPEG/WebP quality (1-100)
const PNG_COMPRESSION_LEVEL = 9; // PNG compression level (0-9)

const ASSETS_DIRS = [
  '../apps/core/content/public/assets',
  '../apps/bex/content/public/assets',
  '../apps/bend/content/public/assets',
  '../apps/core/content/public',
  '../apps/bex/content/public',
  '../apps/bend/content/public',
].map(dir => join(__dirname, dir));

async function getFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getFiles(fullPath));
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    // Directory might not exist, skip it
  }
  return files;
}

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const sizeMB = stats.size / 1024 / 1024;
    
    if (sizeMB <= MAX_SIZE_MB) {
      return { filePath, sizeMB, optimized: false, reason: 'already small enough' };
    }

    const ext = extname(filePath).toLowerCase();
    const metadata = await sharp(filePath).metadata();
    
    // Create temporary file
    const tempPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.optimized$1');
    
    let optimized = false;
    let newSizeMB = sizeMB;
    let reduction = 0;

    if (ext === '.png') {
      await sharp(filePath)
        .png({
          compressionLevel: PNG_COMPRESSION_LEVEL,
          quality: QUALITY,
          adaptiveFiltering: true,
        })
        .toFile(tempPath);
      
      const newStats = await stat(tempPath);
      newSizeMB = newStats.size / 1024 / 1024;
      reduction = ((sizeMB - newSizeMB) / sizeMB) * 100;
      
      if (newSizeMB < sizeMB) {
        // Replace original with optimized
        const fs = await import('fs/promises');
        await fs.rename(tempPath, filePath);
        optimized = true;
      } else {
        // Optimization didn't help, remove temp file
        const fs = await import('fs/promises');
        await fs.unlink(tempPath);
      }
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      await sharp(filePath)
        .jpeg({
          quality: QUALITY,
          mozjpeg: true,
        })
        .toFile(tempPath);
      
      const newStats = await stat(tempPath);
      newSizeMB = newStats.size / 1024 / 1024;
      reduction = ((sizeMB - newSizeMB) / sizeMB) * 100;
      
      if (newSizeMB < sizeMB) {
        // Replace original with optimized
        const fs = await import('fs/promises');
        await fs.rename(tempPath, filePath);
        optimized = true;
      } else {
        // Optimization didn't help, remove temp file
        const fs = await import('fs/promises');
        await fs.unlink(tempPath);
      }
    }

    return {
      filePath,
      sizeMB,
      newSizeMB,
      reduction: optimized ? reduction.toFixed(1) : 0,
      optimized,
      dimensions: `${metadata.width}x${metadata.height}`,
    };
  } catch (error) {
    return {
      filePath,
      error: error.message,
      optimized: false,
    };
  }
}

async function main() {
  console.log('🔍 Scanning for images...\n');
  
  const allFiles = [];
  for (const dir of ASSETS_DIRS) {
    try {
      const files = await getFiles(dir);
      allFiles.push(...files);
    } catch (error) {
      // Directory might not exist, skip
    }
  }

  console.log(`Found ${allFiles.length} images\n`);
  console.log(`Optimizing images larger than ${MAX_SIZE_MB}MB...\n`);

  const results = [];
  for (const file of allFiles) {
    const result = await optimizeImage(file);
    results.push(result);
    
    if (result.error) {
      console.log(`❌ ${file}: ${result.error}`);
    } else if (result.optimized) {
      console.log(`✅ ${file}`);
      console.log(`   ${result.sizeMB.toFixed(2)}MB → ${result.newSizeMB.toFixed(2)}MB (${result.reduction}% reduction)`);
    } else if (result.reason !== 'already small enough') {
      console.log(`⚠️  ${file}: ${result.reason || 'No improvement'}`);
    }
  }

  // Summary
  const optimized = results.filter(r => r.optimized);
  const skipped = results.filter(r => r.reason === 'already small enough');
  const errors = results.filter(r => r.error);
  const totalReduction = optimized.reduce((sum, r) => sum + (r.sizeMB - r.newSizeMB), 0);

  console.log('\n📊 Summary:');
  console.log(`   Optimized: ${optimized.length}`);
  console.log(`   Skipped (already small): ${skipped.length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Total size reduction: ${totalReduction.toFixed(2)}MB`);
  
  if (optimized.length > 0) {
    console.log('\n💾 Optimized images:');
    optimized.forEach(r => {
      console.log(`   ${r.filePath}: ${r.sizeMB.toFixed(2)}MB → ${r.newSizeMB.toFixed(2)}MB`);
    });
  }
}

main().catch(console.error);

