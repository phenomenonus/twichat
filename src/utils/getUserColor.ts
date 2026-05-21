import type { InitialConfig, ThemeType } from "@/types";

import {
  COLOR_FORMAT,
  type CSSColorType,
  getColorFormat,
  hexCssStringToHsl,
  hslCssStringToHsl,
  hslToCssString,
  type HSLType,
  rgbaCssStringToHsl,
  rgbCssStringToHsl,
  type TargetHSLConfigType,
  textToHslCssString,
} from "./colorUtils";

type TwitchCSSColorType = CSSColorType | undefined | null;

/**
 * It helps to adjust text color for background depending on selected theme
 */
const HSL_CONFIG: Record<ThemeType, TargetHSLConfigType> = {
  dark: { lightness: 60, saturation: 80 },
  light: { lightness: 50, saturation: 60 },
  neutral: { lightness: 20, saturation: 95 },
};

/**
 * It's reserved value for `du_color`.
 */
const DEFAULT_USER_COLOR: CSSColorType = "hsl(120 70% 60%)";

/**
 * Get twitch user color.
 */
const getTwUColor = (twColor: TwitchCSSColorType, hslConfig: TargetHSLConfigType): CSSColorType | null => {
  const cssColorFormat = getColorFormat(twColor);
  let hsl: HSLType | null = null;
  if (cssColorFormat === COLOR_FORMAT.HEX) hsl = hexCssStringToHsl(twColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.RGB) hsl = rgbCssStringToHsl(twColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.RGBA) hsl = rgbaCssStringToHsl(twColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.HSL) hsl = hslCssStringToHsl(twColor as string, hslConfig);
  return hsl === null ? hsl : hslToCssString(hsl);
};

/**
 * Get custom user color.
 */
const getCUColor = (userName: string, hslConfig: TargetHSLConfigType): CSSColorType => {
  return textToHslCssString(userName, hslConfig);
};

/**
 * Get default user color.
 */
const getDUColor = (defaultUserColor: string | null, hslConfig: TargetHSLConfigType): CSSColorType => {
  const cssColorFormat = getColorFormat(defaultUserColor);
  let hsl: HSLType | null = null;
  if (cssColorFormat === COLOR_FORMAT.HEX) hsl = hexCssStringToHsl(defaultUserColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.RGB) hsl = rgbCssStringToHsl(defaultUserColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.RGBA) hsl = rgbaCssStringToHsl(defaultUserColor as string, hslConfig);
  if (cssColorFormat === COLOR_FORMAT.HSL) hsl = hslCssStringToHsl(defaultUserColor as string, hslConfig);
  return hsl === null ? DEFAULT_USER_COLOR : hslToCssString(hsl);
};

export const getUserColor = (config: InitialConfig, twColor: string | undefined, userName: string): string => {
  const hslCfg = HSL_CONFIG[config.theme];
  if (config.cu_name === "auto") return getTwUColor(twColor, hslCfg) ?? getCUColor(userName, hslCfg);
  if (config.cu_name === "twitch") return getTwUColor(twColor, hslCfg) ?? getDUColor(config.du_color, hslCfg);
  if (config.cu_name === "custom") return getCUColor(userName, hslCfg);
  return getDUColor(config.du_color, hslCfg);
};
