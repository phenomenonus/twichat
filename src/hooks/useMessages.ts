import React from "react";

import type { ChatClient } from "@twurple/chat";
import { v4 as uuidv4 } from "uuid";

import type { InitialConfig, MessageType } from "../types";
import { formatTime, getUserColor } from "../utils";

export const useMessages = (chatClient: ChatClient, initialConfig: InitialConfig) => {
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const bufferRef = React.useRef<MessageType[]>([]);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Listener for incoming messages
    const listener = chatClient.onMessage((_, user, text, message) => {
      const item: MessageType = {
        date: formatTime(message.date ? new Date(message.date) : new Date()),
        id: uuidv4(),
        isFirst: Boolean(message.isFirst),
        isHighlight: message.isHighlight,
        isLeadMod: Boolean(message.userInfo?.isLeadMod),
        isMod: Boolean(message.userInfo?.isMod),
        isSubscriber: Boolean(message.userInfo?.isSubscriber),
        isVip: Boolean(message.userInfo?.isVip),
        replyMsg: message.isReply ? `💬 ➜ @${message.parentMessageUserName} ${message.parentMessageText}` : null,
        text: String(text || ""),
        userColor: getUserColor(initialConfig, message.userInfo?.color, user),
        userName: user || initialConfig.uu_name,
      };
      bufferRef.current.push(item);
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
      // Cleanup
      chatClient.removeListener(listener);

      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Clear buffer safely
      bufferRef.current = [];
    };
  }, [chatClient, initialConfig]); // ✅ added dependencies

  return { messages };
};
