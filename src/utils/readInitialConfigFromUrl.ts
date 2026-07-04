import type { AnimationType, BGType, ColorNameType, InitialConfig, ThemeType } from "@/types";

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
    chat_fade: parseNum(qp.get("chat_fade")) ?? 0,
    cu_name: (qp.get("cu_name") as ColorNameType) ?? "auto",
    du_color: qp.get("du_color"),
    f_size: parseNum(qp.get("f_size")),
    interval: parseNum(qp.get("interval")) ?? 300,
    limit: parseNum(qp.get("limit")) ?? 50,
    msg_bg: (qp.get("msg_bg") as BGType) ?? "transparent",
    placeholder: qp.get("placeholder") === "true",
    spec: !(qp.get("spec") === "false"),
    theme: (["dark", "light", "neutral"] as ThemeType[]).find((i) => i === qp.get("theme")) ?? "dark",
    time: qp.get("time") === "true",
    uu_name: qp.get("uu_name") || "__ufo",
  };
};
