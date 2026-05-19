import type { AnimationType, BGType, ColorNameType, InitialConfig, ThemeType } from "../types";

export const readInitialConfigFromUrl = (): InitialConfig => {
  const qp = new URLSearchParams(window.location.search);
  const parseNum = (k: string | null): number | null => {
    if (!k) return null;
    const n = Number(k);
    return Number.isFinite(n) ? n : null;
  };

  return {
    animation: (qp.get("animation") as AnimationType) ?? "fadein",
    channel: qp.get("channel") || "",
    chat_bg: (qp.get("chat_bg") as BGType) ?? "transparent",
    cu_name: (qp.get("cu_name") as ColorNameType) ?? "custom",
    du_color: `#${qp.get("du_color") || "34cf53"}`,
    f_size: parseNum(qp.get("f_size")),
    interval: parseNum(qp.get("interval")) ?? 300,
    limit: parseNum(qp.get("limit")) ?? 50,
    msg_bg: (qp.get("msg_bg") as BGType) ?? "transparent",
    placeholder: qp.get("placeholder") === "true",
    spec: !(qp.get("spec") === "false"),
    theme: (qp.get("theme") as ThemeType) ?? "dark",
    time: qp.get("time") === "true",
    uu_name: qp.get("uu_name") || "__UFO",
  };
};
