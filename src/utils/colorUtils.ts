/**
 * Supported CSS color formats
 * @readonly
 * @enum {string}
 */
export const COLOR_FORMAT = {
  HEX: "hex",
  HSL: "hsl",
  RGB: "rgb",
  RGBA: "rgba",
} as const;

/**
 * CSS color string
 */
export type CSSColorType = string;

/**
 * HSL color representation
 * @property {number} hue - Hue value in degrees (0–360)
 * @property {number} saturation - Saturation in percent (0–100)
 * @property {number} lightness - Lightness in percent (0–100)
 */
export type HSLType = { hue: number; saturation: number; lightness: number };

/**
 * Partial HSL configuration used for overriding saturation or lightness
 * @property {number} [saturation] - Optional saturation override (0–100)
 * @property {number} [lightness] - Optional lightness override (0–100)
 */
export type TargetHSLConfigType = Partial<Omit<HSLType, "hue">>;

/**
 * RGB color representation
 * @property {string} r - Red component as string (0–255)
 * @property {string} g - Green component as string (0–255)
 * @property {string} b - Blue component as string (0–255)
 */
export type RGBType = { r: string; g: string; b: string };

/**
 * CSS color format type
 */
export type ColorFormatType = (typeof COLOR_FORMAT)[keyof typeof COLOR_FORMAT];

/**
 * Determine the color format of a CSS color string
 *
 * @param {CSSColorType | null | undefined} value - CSS color string
 * @returns {ColorFormatType | null} - Detected format or null if invalid
 */
export function getColorFormat(value: CSSColorType | null | undefined): ColorFormatType | null {
  if (!value) return null;
  const str = value.trim().toLowerCase();
  if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(str)) return COLOR_FORMAT.HEX;
  if (/^rgb\(/.test(str)) return COLOR_FORMAT.RGB;
  if (/^rgba\(/.test(str)) return COLOR_FORMAT.RGBA;
  if (/^hsl\(/.test(str)) return COLOR_FORMAT.HSL;
  return null;
}

/**
 * Check if a string is a valid CSS color
 *
 * @param {CSSColorType | null | undefined} value - CSS color string
 * @returns {value is string} - True if valid CSS color string
 */
export function isValidCssStringColorFormat(value: CSSColorType | null | undefined): value is string {
  return getColorFormat(value) !== null;
}

/**
 * Convert a HEX color string to an HSL object.
 * Assumes the input is a valid 3- or 6-digit hex, with or without '#'.
 *
 * @param {string} value - HEX color string (e.g., "#ff00aa" or "f0a")
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {HSLType} HSL representation of the color
 */
export function hexCssStringToHsl(value: string, target?: TargetHSLConfigType): HSLType {
  let hex = value.replace(/^#/, "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  const rgb: RGBType = {
    b: parseInt(hex.slice(4, 6), 16).toString(),
    g: parseInt(hex.slice(2, 4), 16).toString(),
    r: parseInt(hex.slice(0, 2), 16).toString(),
  };
  return rgbToHsl(rgb, target);
}

/**
 * Convert an RGB color string to an HSL object.
 * Assumes the input is a valid "rgb(r,g,b)" or "rgb(r g b)" string.
 *
 * @param {string} value - RGB color string
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {HSLType} HSL representation of the color
 */
export function rgbCssStringToHsl(value: string, target?: TargetHSLConfigType): HSLType {
  const [r, g, b] = value
    .replace(/rgb|\(|\)/gi, "")
    .split(/[ ,]+/)
    .map((v) => v.trim());
  return rgbToHsl({ b, g, r }, target);
}

/**
 * Convert an RGBA color string to an HSL object (ignores alpha channel).
 * Assumes the input is a valid "rgba(r,g,b,a)" or "rgba(r g b / a)" string.
 *
 * @param {string} value - RGBA color string
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {HSLType} HSL representation of the color
 */
export function rgbaCssStringToHsl(value: string, target?: TargetHSLConfigType): HSLType {
  const [r, g, b] = value
    .replace(/rgba|\(|\)/gi, "")
    .split(/[ ,/]+/)
    .slice(0, 3)
    .map((v) => v.trim());
  return rgbToHsl({ b, g, r }, target);
}

/**
 * Convert an HSL color string to an HSL object.
 * Assumes the input is a valid "hsl(h, s%, l%)" or "hsl(h s% l%)" string.
 *
 * @param {string} value - HSL color string
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {HSLType} HSL representation of the color
 */
export function hslCssStringToHsl(value: string, target?: TargetHSLConfigType): HSLType {
  const [h, s, l] = value
    .replace(/hsl|\(|\)|%/gi, "")
    .split(/[ ,]+/)
    .map((v) => v.trim());
  return {
    hue: Number(h),
    lightness: target?.lightness ?? Number(l),
    saturation: target?.saturation ?? Number(s),
  };
}

/**
 * Convert an RGBType object to HSL.
 * Assumes r, g, b are valid 0–255 string numbers.
 *
 * @param {RGBType} rgb - RGB object
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {HSLType} HSL representation of the color
 */
export function rgbToHsl(rgb: RGBType, target?: TargetHSLConfigType): HSLType {
  const r = parseInt(rgb.r, 10) / 255;
  const g = parseInt(rgb.g, 10) / 255;
  const b = parseInt(rgb.b, 10) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    lightness: target?.lightness ?? Math.round(l * 100),
    saturation: target?.saturation ?? Math.round(s * 100),
  };
}

/**
 * Convert an HSLType object to a CSS HSL string.
 *
 * @param {HSLType} hsl - HSL object
 * @returns {string} CSS HSL string (e.g., "hsl(123, 70%, 50%)")
 */
export function hslToCssString(hsl: HSLType): CSSColorType {
  return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
}

/**
 * Generate a deterministic HSL CSS string from a short text.
 * Same text always generates the same color.
 * Fast, lightweight, and optionally supports overrides for saturation/lightness.
 *
 * @param {string} text - Input string
 * @param {TargetHSLConfigType} [target] - Optional overrides for saturation/lightness
 * @returns {string} Deterministic CSS HSL color string (e.g., "hsl(123, 70%, 50%)")
 */
export function textToHslCssString(text: string, target?: TargetHSLConfigType): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;
  const saturation = target?.saturation ?? 70;
  const lightness = target?.lightness ?? 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
