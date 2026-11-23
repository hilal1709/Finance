# Accounting · Logo guidelines

## Idea

**Trace Loop** combines an open, rounded loop with a separate entry point. The loop represents accountable work that can be followed; the point marks the start of a record. The shape stays legible as a one-colour symbol.

## Approved artwork

| Use | File |
|---|---|
| Website header / primary (no descriptor) | `digital/accounting-horizontal.svg` |
| Reversed header on Indigo | `digital/accounting-horizontal-reversed.svg` |
| Compact square placement | `digital/accounting-stacked.svg` |
| Reversed stacked placement | `digital/accounting-stacked-reversed.svg` |
| Icon, avatar, favicon | `digital/accounting-symbol-small-favicon.svg` |
| App tile | `digital/accounting-symbol-small-app-icon.svg` |
| Single-colour printing | `digital/accounting-horizontal-black.svg` or `digital/accounting-horizontal-mono-197d79.svg` |
| Wordmark only | `digital/accounting-wordmark.svg` |

Use the SVG where possible. PNGs in `digital/raster/` are provided for software that does not accept SVG. The web icon files and manifest are in `digital/raster/` and `digital/site.webmanifest`.

## Clear space and minimum size

Keep clear space at least the diameter of the mark's signal point (`22` units in the 256-unit symbol master) around every side. For the wordmark lockup, use the same clear-space unit measured against the source artboard.

| Version | Screen minimum | Print minimum |
|---|---:|---:|
| Horizontal lockup | 170 px wide | 32 mm wide |
| Stacked lockup (with descriptor) | 300 px wide | 55 mm wide |
| Symbol | 20 px; prefer the small-size cut below 32 px | 6 mm wide |

For 16 px browser tabs use `accounting-symbol-small-favicon.svg` or the generated `.ico`; avoid the wordmark at that size.

## Colour palette

| Name | HEX | RGB | CMYK estimate | Use |
|---|---|---|---|---|
| Midnight Indigo | `#17234D` | 23, 35, 77 | 70, 55, 0, 70 | Primary mark, dark field, wordmark |
| Harbor Teal | `#197D79` | 25, 125, 121 | 80, 0, 3, 51 | Signal point and highlights |
| Signal Mint | `#82D8CE` | 130, 216, 206 | 40, 0, 5, 15 | Reversed signal point and UI accent |
| Mineral | `#F4F6F8` | 244, 246, 248 | 2, 1, 0, 3 | Light identity background |
| Ink | `#14213E` | 20, 33, 62 | 68, 47, 0, 76 | Supporting text and print fallback |

CMYK values are mathematical conversions from sRGB, not press proofs. Confirm with the printer and a physical swatch. Pantone is intentionally unspecified until a print vendor confirms the stock and process.

## Approved pairings

- Full colour on white or Mineral.
- White + Signal Mint on Midnight Indigo.
- Midnight Indigo on white for one-colour reproduction.
- Harbor Teal one-colour on white when the mark is large enough to preserve contrast.

Do not place Harbor Teal or Signal Mint alone on white for small text. The mark is artwork, but any adjacent descriptor should maintain strong text contrast.

## Typography

- Wordmark: IBM Plex Sans Semibold 600, lowercase, custom optical tracking; the final SVG contains outlined paths and does not require the font to render.
- Descriptor: IBM Plex Sans Medium 500, uppercase, spaced lettering; also outlined in the SVG masters.
- Product UI: IBM Plex Sans Variable with IBM Plex Mono for tabular data. Use the standard system sans-serif fallback if the web font is unavailable.
- IBM Plex Sans is distributed under SIL Open Font License 1.1. See `font-license.txt`.

## Do

- Keep the lockup proportions and signal-point colour intact.
- Use reversed files on the specified Midnight Indigo surface.
- Choose the small-size cut at 32 px and below.
- Use SVG masters for signage and large-format output.

## Don't

- Stretch, rotate, outline, shadow, or add a gradient to the logo.
- Reposition the signal point or change the wordmark spacing.
- Recolour the full-colour lockup outside this palette.
- Place reversed artwork on a busy image without a solid Indigo field.
- Recreate the wordmark by typing it in another font.
