import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download list from scratch/images.json if exists
async function downloadImages() {
  console.log('Starting image download...');
  let images = [];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'scratch', 'images.json'), 'utf8');
    images = JSON.parse(raw);
  } catch (e) {
    console.error('Could not read images.json:', e.message);
  }

  const downloadedMap = {};

  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const filename = path.basename(url.split('?')[0]);
    const cleanName = filename.includes('.') ? filename : `${filename}.png`;
    const targetPath = path.join(imagesDir, cleanName);

    downloadedMap[url] = `/images/${cleanName}`;

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 0) {
      continue;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
      console.log(`[${i+1}/${images.length}] Downloaded ${cleanName}`);
    } catch (err) {
      console.error(`Failed to download ${url}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'scratch', 'downloaded-map.json'),
    JSON.stringify(downloadedMap, null, 2)
  );
  console.log('Image download complete!');
}

downloadImages();
