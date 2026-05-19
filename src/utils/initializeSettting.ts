import type { InitialConfig } from "@/types";

export const initializeSettting = (initialConfig: InitialConfig) => {
  if (initialConfig.f_size !== null) document.documentElement.style.fontSize = `${initialConfig.f_size}px`;
  if (initialConfig.theme) document.documentElement.setAttribute("data-theme", initialConfig.theme);
  if (initialConfig.chat_bg) document.documentElement.setAttribute("data-chat-bg", initialConfig.chat_bg);
  if (initialConfig.msg_bg) document.documentElement.setAttribute("data-msg-bg", initialConfig.msg_bg);
  if (initialConfig.animation) document.documentElement.setAttribute("data-animation", initialConfig.animation);
  if (initialConfig.placeholder) document.documentElement.setAttribute("data-placeholder", "true");
};
