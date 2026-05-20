import type { InitialConfig } from "@/types";

export const initializeSettings = (cfg: InitialConfig) => {
  document.documentElement.setAttribute("data-theme", cfg.theme);
  if (cfg.animation !== "none") document.documentElement.setAttribute("data-animation", cfg.animation);
  if (cfg.f_size !== null) document.documentElement.style.fontSize = `${cfg.f_size}px`;
  if (cfg.chat_bg !== "transparent") document.documentElement.setAttribute("data-chat-bg", cfg.chat_bg);
  if (cfg.msg_bg !== "transparent") document.documentElement.setAttribute("data-msg-bg", cfg.msg_bg);
  if (cfg.placeholder) document.documentElement.setAttribute("data-placeholder", "true");
};
