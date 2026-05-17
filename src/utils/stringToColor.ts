// List of colors to exclude
const excludedColors = [
  "#000000", // black
  "#808080", // gray
  "#A9A9A9", // dark gray
  "#00008B", // dark blue
];

// Utility to generate a hash from a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a hex color from a string
export function stringToColor(str: string): string {
  const hash = hashString(str);

  // Generate color in HSL format to avoid dark/dull colors
  const h = hash % 360; // hue
  const s = 70 + (hash % 30); // saturation 70-100%
  const l = 50 + (hash % 20); // lightness 50-70%

  // Convert HSL to HEX
  const color = hslToHex(h, s, l);

  // Check for exclusions, if it matches, slightly tweak it
  if (excludedColors.includes(color.toUpperCase())) {
    return stringToColor(str + "x"); // tweak hash
  }

  return color;
}

// Convert HSL to HEX
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  const toHex = (v: number) => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
