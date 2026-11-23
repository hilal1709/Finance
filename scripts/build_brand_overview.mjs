import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const rasters = path.join(root, 'public/brand-kit/digital/raster');
const readData = async (name) => `data:image/png;base64,${(await readFile(path.join(rasters, name))).toString('base64')}`;
const [horizontal, stacked, reverse, app, f16, f32, f48] = await Promise.all([
  readData('accounting-horizontal-1800.png'), readData('accounting-stacked-960.png'), readData('accounting-horizontal-white-1800.png'), readData('apple-touch-icon.png'), readData('favicon-16.png'), readData('favicon-32.png'), readData('favicon-48.png'),
]);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1700" height="1190" viewBox="0 0 1700 1190">
<rect width="1700" height="1190" fill="#F4F6F8"/>
<text x="72" y="74" fill="#17234D" font-family="Arial,sans-serif" font-size="15" font-weight="700" letter-spacing="3">ACCOUNTING · TRACE LOOP</text>
<text x="72" y="124" fill="#17234D" font-family="Arial,sans-serif" font-size="36" font-weight="700">An open mark. A clear point of provenance.</text>
<text x="72" y="157" fill="#64728A" font-family="Arial,sans-serif" font-size="15">Final identity system · Digital Accounting Operations</text>

<rect x="72" y="192" width="1030" height="350" rx="18" fill="#FFFFFF" stroke="#DCE3EA"/>
<text x="100" y="230" fill="#62718A" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">PRIMARY · HORIZONTAL LOCKUP</text>
<image x="130" y="250" width="910" height="390" preserveAspectRatio="xMidYMid meet" href="${horizontal}" xlink:href="${horizontal}"/>

<rect x="1130" y="192" width="498" height="350" rx="18" fill="#FFFFFF" stroke="#DCE3EA"/>
<text x="1160" y="230" fill="#62718A" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">APP ICON · MIDNIGHT INDIGO</text>
<image x="1270" y="248" width="220" height="220" preserveAspectRatio="xMidYMid meet" href="${app}" xlink:href="${app}"/>
<text x="1160" y="500" fill="#506078" font-family="Arial,sans-serif" font-size="13">Symbol-only use for tabs, app tiles, and compact navigation.</text>

<rect x="72" y="570" width="455" height="380" rx="18" fill="#FFFFFF" stroke="#DCE3EA"/>
<text x="100" y="610" fill="#62718A" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">STACKED LOCKUP</text>
<image x="105" y="615" width="390" height="310" preserveAspectRatio="xMidYMid meet" href="${stacked}" xlink:href="${stacked}"/>

<rect x="555" y="570" width="680" height="380" rx="18" fill="#17234D" stroke="#27385E"/>
<text x="585" y="610" fill="#B8C5DC" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">REVERSED · ON INDIGO</text>
<image x="600" y="620" width="590" height="300" preserveAspectRatio="xMidYMid meet" href="${reverse}" xlink:href="${reverse}"/>

<rect x="1263" y="570" width="365" height="380" rx="18" fill="#FFFFFF" stroke="#DCE3EA"/>
<text x="1292" y="610" fill="#62718A" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">CORE PALETTE</text>
<rect x="1292" y="640" width="306" height="58" rx="9" fill="#17234D"/><text x="1310" y="675" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="13">Midnight Indigo · #17234D</text>
<rect x="1292" y="712" width="306" height="58" rx="9" fill="#197D79"/><text x="1310" y="747" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="13">Harbor Teal · #197D79</text>
<rect x="1292" y="784" width="306" height="58" rx="9" fill="#82D8CE"/><text x="1310" y="819" fill="#17234D" font-family="Arial,sans-serif" font-size="13">Signal Mint · #82D8CE</text>
<rect x="1292" y="856" width="306" height="48" rx="9" fill="#F4F6F8" stroke="#DCE3EA"/><text x="1310" y="886" fill="#17234D" font-family="Arial,sans-serif" font-size="13">Mineral · #F4F6F8</text>

<rect x="72" y="978" width="1030" height="145" rx="18" fill="#FFFFFF" stroke="#DCE3EA"/>
<text x="100" y="1018" fill="#62718A" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">FAVICON LEGIBILITY · 16 / 32 / 48 PX</text>
<image x="120" y="1032" width="48" height="48" preserveAspectRatio="none" image-rendering="pixelated" href="${f16}" xlink:href="${f16}"/>
<image x="230" y="1026" width="64" height="64" preserveAspectRatio="none" image-rendering="pixelated" href="${f32}" xlink:href="${f32}"/>
<image x="360" y="1020" width="80" height="80" preserveAspectRatio="none" image-rendering="pixelated" href="${f48}" xlink:href="${f48}"/>
<text x="112" y="1105" fill="#718097" font-family="Arial,sans-serif" font-size="11">16 px</text><text x="248" y="1105" fill="#718097" font-family="Arial,sans-serif" font-size="11">32 px</text><text x="386" y="1105" fill="#718097" font-family="Arial,sans-serif" font-size="11">48 px</text>
<text x="540" y="1065" fill="#17234D" font-family="Arial,sans-serif" font-size="18" font-weight="700">IBM Plex Sans Semibold</text>
<text x="540" y="1097" fill="#64728A" font-family="Arial,sans-serif" font-size="14">Outline wordmark · descriptor in Medium 500</text>

<text x="1130" y="1060" fill="#17234D" font-family="Arial,sans-serif" font-size="13" font-weight="700">FILES</text>
<text x="1130" y="1085" fill="#64728A" font-family="Arial,sans-serif" font-size="12">SVG masters · mono &amp; reverse</text>
<text x="1130" y="1108" fill="#64728A" font-family="Arial,sans-serif" font-size="12">PNG exports · web/PWA icons</text>
</svg>`;

const out = path.join(root, 'public/brand-kit/presentation/brand-overview.png');
await sharp(Buffer.from(svg)).png().toFile(out);
await writeFile(path.join(root, 'public/brand-kit/presentation/brand-overview.svg'), svg, 'utf8');
console.log(`Created ${out}`);
