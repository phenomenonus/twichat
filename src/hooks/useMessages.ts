import React from "react";

import type { ChatClient } from "@twurple/chat";

import { formatTime, getUserColor } from "@/utils";

import type { InitialConfig, MessageType } from "@/types";

export const useMessages = (client: ChatClient, initialConfig: InitialConfig) => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const bufferRef = React.useRef<MessageType[]>([]);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onBanListener = client.onBan((_, userName) => {
      setMessages((arr) => arr.map((msg) => (msg.userName === userName ? { ...msg, isDeleted: true } : msg)));
    });

    const onChatClearListener = client.onChatClear(() => {
      setMessages([]);
    });

    const onMessageListener = client.onMessage((_, user, text, msg) => {
      const message: MessageType = {
        id: msg.id,
        isDeleted: false,
        isFirst: Boolean(msg.isFirst),
        isHighlight: msg.isHighlight,
        isLeadMod: Boolean(msg.userInfo?.isLeadMod),
        isMod: Boolean(msg.userInfo?.isMod),
        isSubscriber: Boolean(msg.userInfo?.isSubscriber),
        isVip: Boolean(msg.userInfo?.isVip),
        raidMsg: null,
        replyMsg: msg.isReply ? `💬 ➜ @${msg.parentMessageUserName} ${msg.parentMessageText}` : null,
        text: String(text || ""),
        timestamp: formatTime(msg.date ? new Date(msg.date) : new Date()),
        userColor: getUserColor(initialConfig, msg.userInfo?.color, user),
        userName: user || initialConfig.uu_name,
      };
      bufferRef.current.push(message);
    });

    const onMessageRemoveListener = client.onMessageRemove((_, msgId) => {
      setMessages((arr) => arr.map((msg) => (msg.id === msgId ? { ...msg, isDeleted: true } : msg)));
    });

    const onRaidListener = client.onRaid((_, user, raidInfo, msg) => {
      const message: MessageType = {
        id: msg.id,
        isDeleted: false,
        isFirst: false,
        isHighlight: false,
        isLeadMod: Boolean(msg.userInfo?.isLeadMod),
        isMod: Boolean(msg.userInfo?.isMod),
        isSubscriber: Boolean(msg.userInfo?.isSubscriber),
        isVip: Boolean(msg.userInfo?.isVip),
        raidMsg: { isCanceled: false, userName: raidInfo.displayName, viewerCount: raidInfo.viewerCount },
        replyMsg: null,
        text: msg.text ?? "",
        timestamp: formatTime(msg.date ? new Date(msg.date) : new Date()),
        userColor: "",
        userName: user || initialConfig.uu_name,
      };
      bufferRef.current.push(message);
    });

    const onRaidCancelListener = client.onRaidCancel((_, msg) => {
      const message: MessageType = {
        id: msg.id,
        isDeleted: false,
        isFirst: false,
        isHighlight: false,
        isLeadMod: Boolean(msg.userInfo?.isLeadMod),
        isMod: Boolean(msg.userInfo?.isMod),
        isSubscriber: Boolean(msg.userInfo?.isSubscriber),
        isVip: Boolean(msg.userInfo?.isVip),
        raidMsg: { isCanceled: true, userName: msg.userInfo.displayName },
        replyMsg: null,
        text: msg.text ?? "",
        timestamp: formatTime(msg.date ? new Date(msg.date) : new Date()),
        userColor: "",
        userName: msg.userInfo.displayName || initialConfig.uu_name,
      };
      bufferRef.current.push(message);
    });

    // Timer to flush buffer
    timerRef.current = window.setInterval(() => {
      const batch = bufferRef.current.splice(0, bufferRef.current.length);
      if (batch.length === 0) return;
      setMessages((prev) => {
        const next = prev.concat(batch);
        return next.length > initialConfig.limit ? next.slice(-initialConfig.limit) : next;
      });
    }, initialConfig.interval);

    return () => {
      client.removeListener(onBanListener);
      client.removeListener(onChatClearListener);
      client.removeListener(onMessageListener);
      client.removeListener(onMessageRemoveListener);
      client.removeListener(onRaidListener);
      client.removeListener(onRaidCancelListener);

      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      bufferRef.current = [];
    };
  }, [client, initialConfig]);

  return { messages };
};
