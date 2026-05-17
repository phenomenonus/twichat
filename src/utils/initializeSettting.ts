import type { InitialConfig } from "@/types";

export const initializeSettting = (initialConfig: InitialConfig, elem: HTMLElement) => {
  elem.classList.add(initialConfig.animation);
  if (initialConfig.f_size !== null) document.documentElement.style.fontSize = `${initialConfig.f_size}px`;
  if (initialConfig.glass) elem.classList.add("glass");
  if (initialConfig.placeholder) elem.classList.add("placeholder");
};
