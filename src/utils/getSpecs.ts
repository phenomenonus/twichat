import type { MessageType } from "../types";

const SPEC = {
  FIRST_MESSAGE: "🚀",
  LEAD_MODERATOR: "⚔️",
  MODERATOR: "🗡️",
  SUBSCRIBER: "⭐",
  VIP: "🌟",
};

export const getSpecs = (item: MessageType): string | null => {
  const specs = [];
  if (item.isSubscriber) specs.push(SPEC.SUBSCRIBER);
  if (item.isFirst) specs.push(SPEC.FIRST_MESSAGE);
  if (item.isMod) specs.push(SPEC.MODERATOR);
  if (item.isLeadMod) specs.push(SPEC.LEAD_MODERATOR);
  if (item.isVip) specs.push(SPEC.VIP);
  return specs.length === 0 ? null : specs.join("");
};
