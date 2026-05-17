import type { InitialConfig } from "../types";

import { stringToColor } from "./stringToColor";

export const getUserColor = (initialConfig: InitialConfig, userColor: string | undefined, userName: string): string => {
  if (initialConfig.cu_name === "auto") return userColor || stringToColor(userName);
  if (initialConfig.cu_name === "twitch") return userColor || initialConfig.du_color;
  if (initialConfig.cu_name === "custom") return stringToColor(userName);
  return initialConfig.du_color;
};
