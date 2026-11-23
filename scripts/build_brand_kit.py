"""Build outlined IBM Plex wordmarks and original Trace Loop lockups."""
from pathlib import Path
from html import escape
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / "public" / "brand-kit"
FONT = ROOT / "node_modules" / "@fontsource-variable" / "ibm-plex-sans" / "files" / "ibm-plex-sans-latin-wght-normal.woff2"
INDIGO = "#17234D"
TEAL = "#197D79"
MINT = "#82D8CE"
WHITE = "#FFFFFF"

SYMBOL_PATH = "M84 58H150A46 46 0 0 1 196 104V152A46 46 0 0 1 150 198H104A44 44 0 0 1 60 154V130"

font = instantiateVariableFont(TTFont(FONT), {"wght": 600}, inplace=False)
glyph_set = font.getGlyphSet()
cmap = font.getBestCmap()
units = font["head"].unitsPerEm


def outlined_text(text: str, x: float, baseline: float, size: float, color: str, tracking: float = 0) -> tuple[str, float]:
    scale = size / units
    paths: list[str] = []
    cursor = x
    for char in text:
        glyph_name = cmap.get(ord(char))
        if not glyph_name:
            cursor += size * 0.35
            continue
        pen = SVGPathPen(glyph_set)
        glyph_set[glyph_name].draw(pen)
        path_data = pen.getCommands()
        if path_data:
            paths.append(f'<path fill="{color}" transform="translate({cursor:.2f} {baseline:.2f}) scale({scale:.5f} -{scale:.5f})" d="{path_data}"/>')
        cursor += (font["hmtx"].metrics[glyph_name][0] * scale) + tracking
    return "\n".join(paths), cursor - x


def symbol_group(color: str, point: str, transform: str = "") -> str:
    transform_attr = f' transform="{transform}"' if transform else ""
    return f'''<g id="trace-loop-symbol"{transform_attr}>
  <g transform="translate(-13 -19) scale(1.15)">
  <path d="{SYMBOL_PATH}" fill="none" stroke="{color}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="60" cy="84" r="11" fill="{point}"/>
  </g>
</g>'''


def svg(title: str, width: int, height: int, body: str, bg: str | None = None) -> str:
    rect = f'<rect width="{width}" height="{height}" fill="{bg}"/>' if bg else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title">
<title id="title">{escape(title)}</title>
{rect}
{body}
</svg>
'''


def save(path: Path, data: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(data, encoding="utf-8")


source = KIT / "source"
digital = KIT / "digital"
symbol_master = svg("Accounting Trace Loop symbol · colour", 256, 256, symbol_group(INDIGO, TEAL))
symbol_small = svg("Accounting Trace Loop symbol · small-size", 256, 256,
                   f'<g transform="translate(-13 -19) scale(1.15)"><path d="{SYMBOL_PATH}" fill="none" stroke="{INDIGO}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="84" r="13" fill="{TEAL}"/></g>')
save(source / "accounting-symbol-color.svg", symbol_master)
save(source / "accounting-symbol-small.svg", symbol_small)

# Horizontal lockup: an outlined symbol and wordmark without a descriptor for small-screen legibility.
word, word_width = outlined_text("accounting", 0, 0, 84, INDIGO, tracking=-0.7)
word_x = 248
word_path, _ = outlined_text("accounting", word_x, 141, 84, INDIGO, tracking=-0.7)
dot_x = word_x + word_width + 8
horizontal_body = f'''{symbol_group(INDIGO, TEAL, "translate(53 53) scale(0.58)")}
{word_path}
<circle cx="{dot_x:.2f}" cy="138" r="5.4" fill="{TEAL}"/>'''
horizontal_width = int(dot_x + 16) - 70
horizontal_body = f'<g transform="translate(-70 -42)">{horizontal_body}</g>'
save(source / "accounting-horizontal-color.svg", svg("Accounting Digital Operations · horizontal logo", horizontal_width, 170, horizontal_body))

# Stacked lockup for near-square contexts.
stack_word_size = 64
stack_width = outlined_text("accounting", 0, 0, stack_word_size, INDIGO, tracking=-0.5)[1]
stack_canvas_width = 440
stack_canvas_height = 390
stack_x = (stack_canvas_width - stack_width) / 2
stack_word, _ = outlined_text("accounting", stack_x, 300, stack_word_size, INDIGO, tracking=-0.5)
stack_desc, desc_width = outlined_text("DIGITAL OPERATIONS", 0, 338, 14, "#53617A", tracking=1.5)
desc_x = (stack_canvas_width - desc_width) / 2
stack_desc, _ = outlined_text("DIGITAL OPERATIONS", desc_x, 338, 14, "#53617A", tracking=1.5)
stack_dot = stack_x + stack_width + 8
stack_body = f'''<g transform="translate(-7.5 -1.5)">{symbol_group(INDIGO, TEAL, "translate(104 12) scale(0.90)")}
{stack_word}<circle cx="{stack_dot:.2f}" cy="296" r="4.5" fill="{TEAL}"/>
{stack_desc}</g>'''
save(source / "accounting-stacked-color.svg", svg("Accounting Digital Operations · stacked logo", stack_canvas_width, stack_canvas_height, stack_body))

wordmark, wordmark_width = outlined_text("accounting", 20, 85, 78, INDIGO, tracking=-0.6)
save(source / "accounting-wordmark-color.svg", svg("Accounting · outlined wordmark", int(wordmark_width + 50), 128,
                                                       f'{wordmark}<circle cx="{20 + wordmark_width + 8:.2f}" cy="81" r="5" fill="{TEAL}"/>'))
reversed_wordmark, reversed_wordmark_width = outlined_text("accounting", 20, 85, 78, WHITE, tracking=-0.6)
save(source / "accounting-wordmark-reversed.svg", svg("Accounting · reversed outlined wordmark", int(reversed_wordmark_width + 50), 128,
                                                              f'<rect width="{int(reversed_wordmark_width + 50)}" height="128" fill="{INDIGO}"/>{reversed_wordmark}<circle cx="{20 + reversed_wordmark_width + 8:.2f}" cy="81" r="5" fill="{MINT}"/>'))

# Reversed colour masters retain a mint signal point on an indigo field.
dark_symbol = svg("Accounting Trace Loop symbol · reversed", 256, 256, symbol_group(WHITE, MINT), INDIGO)
save(source / "accounting-symbol-reversed.svg", dark_symbol)
dark_h_word, _ = outlined_text("accounting", word_x, 141, 84, WHITE, tracking=-0.7)
dark_h_body = f'''<rect width="{horizontal_width}" height="170" fill="{INDIGO}"/>
<g transform="translate(-70 -42)">
{symbol_group(WHITE, MINT, "translate(53 53) scale(0.58)")}
{dark_h_word}<circle cx="{dot_x:.2f}" cy="138" r="5.4" fill="{MINT}"/></g>'''
save(source / "accounting-horizontal-reversed.svg", svg("Accounting Digital Operations · reversed horizontal logo", horizontal_width, 170, dark_h_body, None))
dark_stack_word, _ = outlined_text("accounting", stack_x, 300, stack_word_size, WHITE, tracking=-0.5)
dark_stack_desc, _ = outlined_text("DIGITAL OPERATIONS", desc_x, 338, 14, "#D5DEEF", tracking=1.5)
dark_stack_body = f'''<rect width="{stack_canvas_width}" height="{stack_canvas_height}" fill="{INDIGO}"/>
<g transform="translate(-7.5 -1.5)">
{symbol_group(WHITE, MINT, "translate(104 12) scale(0.90)")}
{dark_stack_word}<circle cx="{stack_dot:.2f}" cy="296" r="4.5" fill="{MINT}"/>{dark_stack_desc}</g>'''
save(source / "accounting-stacked-reversed.svg", svg("Accounting Digital Operations · reversed stacked logo", stack_canvas_width, stack_canvas_height, dark_stack_body))

print(f"Built outlined masters in {source}")
print(f"Horizontal artboard: {horizontal_width} × 256; wordmark width: {word_width:.1f}")
