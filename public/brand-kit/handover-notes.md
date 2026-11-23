# Handover notes

## Rationale

The Trace Loop keeps the approved A concept: a rounded, open loop and a distinct signal point. The open left edge keeps the symbol from becoming a closed seal; the separate point gives a clear start cue without depicting a ledger, calculator, or chart. Midnight Indigo carries the workspace's established shell colour, while Harbor Teal provides the signal accent. On dark surfaces, Signal Mint replaces Teal for contrast.

The wordmark uses IBM Plex Sans Semibold in lowercase to match the product's UI voice. Letterforms and the descriptor are outlined in the source SVG, so the logo does not depend on installed fonts. The app icon has a solid Midnight Indigo tile; symbol-only variants remain transparent.

## Craft and checks

- Master symbol uses a 256 × 256 viewBox with one rounded open path and a separate circular signal point.
- The mark is intentionally stroke-based (`18` units, round caps and joins) so geometry stays simple and scales proportionally with the SVG. The browser and app-icon exports were checked at 16, 32, 48, 192, 512, and 1024 px.
- Wordmark and descriptor are outlined paths. No live `<text>`, raster, filters, or gradients are used in the master artwork.
- Original symbol and lockup SVGs passed the bundled logo audit. The audit flags stroke expansion as an informational follow-up; keep these stroke-based masters for digital production or ask a vector operator to expand strokes before CNC, cutting, or embroidery.
- PNG outputs were rendered from the SVG masters and visually inspected on light, dark, and app-tile backgrounds.

## Open items

- No trademark search or legal clearance was performed. Search relevant trademark registers before public launch.
- CMYK conversions are estimates. Confirm print colour and material against a physical proof.
- For manufacturing artwork, expand strokes in a vector editor and check the resulting joins at final size.

## Font licence

The wordmark paths were generated from IBM Plex Sans Variable Semibold. IBM Plex Sans is licensed under SIL Open Font License 1.1; the licence text is included in `font-license.txt`. The logo files contain paths, not embedded font files.
