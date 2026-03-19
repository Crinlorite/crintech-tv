// Build script: scans each installation folder for images and generates images.json
// Runs as Cloudflare Pages build command: node _build.js

const fs = require('fs');
const path = require('path');

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
const IGNORE = ['node_modules', '.git', '_build.js'];

// Find all installation directories (folders with an index.html and images/ subfolder)
const root = __dirname;
const entries = fs.readdirSync(root, { withFileTypes: true });

for (const entry of entries) {
  if (!entry.isDirectory() || IGNORE.includes(entry.name)) continue;

  const imagesDir = path.join(root, entry.name, 'images');
  const jsonPath = path.join(root, entry.name, 'images.json');

  if (!fs.existsSync(imagesDir)) continue;

  const files = fs.readdirSync(imagesDir)
    .filter(f => EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort();

  fs.writeFileSync(jsonPath, JSON.stringify(files, null, 2));
  console.log(`${entry.name}/images.json → ${files.length} imagen(es)`);
}

console.log('Build OK');
