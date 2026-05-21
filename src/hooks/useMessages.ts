import React from "react";

import type { ChatClient } from "@twurple/chat";

import { formatTime, getUserColor } from "@/utils";

import type { InitialConfig, MessageType } from "@/types";

export const useMessages = (client: ChatClient, initialConfig: InitialConfig) => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const bufferRef = React.useRef<MessageType[]>([]);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const onMessageListener = client.onMessage((_, user, text, message) => {
      const msg: MessageType = {
        id: message.id,
        isDeleted: false,
        isFirst: Boolean(message.isFirst),
        isHighlight: message.isHighlight,
        isLeadMod: Boolean(message.userInfo?.isLeadMod),
        isMod: Boolean(message.userInfo?.isMod),
        isSubscriber: Boolean(message.userInfo?.isSubscriber),
        isVip: Boolean(message.userInfo?.isVip),
        replyMsg: message.isReply ? `💬 ➜ @${message.parentMessageUserName} ${message.parentMessageText}` : null,
        text: String(text || ""),
        timestamp: formatTime(message.date ? new Date(message.date) : new Date()),
        userColor: getUserColor(initialConfig, message.userInfo?.color, user),
        userName: user || initialConfig.uu_name,
      };
      bufferRef.current.push(msg);
    });

    const onChatClearListener = client.onChatClear(() => {
      setMessages([]);
    });

    const onMessageRemoveListener = client.onMessageRemove((_, msgId) => {
      setMessages((arr) => arr.map((msg) => (msg.id === msgId ? { ...msg, isDeleted: true } : msg)));
    });

    const onBanListener = client.onBan((_, userName) => {
      setMessages((arr) => arr.map((msg) => (msg.userName === userName ? { ...msg, isDeleted: true } : msg)));
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
      client.removeListener(onMessageListener);
      client.removeListener(onChatClearListener);
      client.removeListener(onMessageRemoveListener);
      client.removeListener(onBanListener);

      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      bufferRef.current = [];
    };
  }, [client, initialConfig]);

  return { messages };
};
