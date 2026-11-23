import { readdir, readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const digital = path.join(root, 'public/brand-kit/digital');
const raster = path.join(digital, 'raster');
await mkdir(raster, { recursive: true });

async function render(name, width, height, outName = `${name}-${width}.png`, background) {
  const source = await readFile(path.join(digital, `${name}.svg`));
  let pipeline = sharp(source, { density: 320 }).resize(width, height, { fit: 'contain', background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } });
  if (background) pipeline = pipeline.flatten({ background });
  await pipeline.png().toFile(path.join(raster, outName));
}

const symbols = ['accounting-symbol', 'accounting-symbol-black', 'accounting-symbol-white', 'accounting-symbol-mono-197d79', 'accounting-symbol-small-black', 'accounting-symbol-small-white', 'accounting-symbol-small-mono-197d79'];
for (const name of symbols) {
  for (const size of [512, 1024]) await render(name, size, size);
}
for (const name of ['accounting-horizontal', 'accounting-horizontal-black', 'accounting-horizontal-white', 'accounting-horizontal-mono-197d79']) {
  await render(name, 1800, 500);
}
for (const name of ['accounting-stacked', 'accounting-stacked-black', 'accounting-stacked-white', 'accounting-stacked-mono-197d79']) {
  await render(name, 960, 850);
}
for (const name of ['accounting-wordmark', 'accounting-wordmark-black', 'accounting-wordmark-white', 'accounting-wordmark-mono-197d79']) {
  await render(name, 1400, 320);
}

const iconSvg = await readFile(path.join(digital, 'accounting-symbol-small-app-icon.svg'));
await sharp(iconSvg, { density: 320 }).resize(180, 180, { fit: 'contain' }).png().toFile(path.join(raster, 'apple-touch-icon.png'));
await sharp(iconSvg, { density: 320 }).resize(192, 192, { fit: 'contain' }).png().toFile(path.join(raster, 'icon-192.png'));
await sharp(iconSvg, { density: 320 }).resize(512, 512, { fit: 'contain' }).png().toFile(path.join(raster, 'icon-512.png'));

const maskableSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="#17234D"/><g transform="translate(28 28) scale(.78)" fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"><path d="M84 58H150A46 46 0 0 1 196 104V152A46 46 0 0 1 150 198H104A44 44 0 0 1 60 154V130"/><circle cx="60" cy="84" r="11" fill="#82D8CE" stroke="none"/></g></svg>`);
await sharp(maskableSvg, { density: 320 }).resize(512, 512).png().toFile(path.join(raster, 'maskable-512.png'));

const faviconSvg = await readFile(path.join(digital, 'accounting-symbol-small-favicon.svg'));
const pngs = [];
for (const size of [16, 32, 48]) {
  const file = path.join(raster, `favicon-${size}.png`);
  await sharp(faviconSvg, { density: 320 }).resize(size, size, { fit: 'contain' }).png().toFile(file);
  pngs.push(file);
}
await writeFile(path.join(raster, 'favicon-source.svg'), faviconSvg);

await writeFile(path.join(digital, 'site.webmanifest'), JSON.stringify({
  name: 'Accounting Digital Operations', short_name: 'Accounting', start_url: '/', display: 'standalone',
  background_color: '#F4F6F8', theme_color: '#17234D', icons: [
    { src: '/brand-kit/digital/raster/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/brand-kit/digital/raster/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/brand-kit/digital/raster/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2) + '\n');

const srcIcon = path.join(root, 'src/app/icon.svg');
await copyFile(path.join(digital, 'accounting-symbol-small-app-icon.svg'), srcIcon);
console.log(`Rendered brand rasters to ${raster}`);
