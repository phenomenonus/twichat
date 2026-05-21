import React from "react";

import type { ChatClient } from "@twurple/chat";

import { cns, getSpecs } from "@/utils";

import { useAutoScroll, useMessages } from "@/hooks";

import { RaidMessage, WelcomeMessage } from "@/ui";

import type { InitialConfig } from "@/types";

type ChatPropsType = {
  client: ChatClient;
  containerRef: React.RefObject<HTMLDivElement>;
  initialConfig: InitialConfig;
};

export const Chat: React.FC<ChatPropsType> = ({ client, containerRef, initialConfig }) => {
  const { messages } = useMessages(client, initialConfig);
  useAutoScroll(containerRef, messages);

  if (messages.length === 0) {
    return <WelcomeMessage channel={initialConfig.channel} />;
  }

  return messages.map((msg) => {
    if (msg.raidMsg !== null) {
      return <RaidMessage key={msg.id} raidMsg={msg.raidMsg} />;
    }

    const specs = initialConfig.spec ? getSpecs(msg) : null;

    return (
      <div className={cns("msg", initialConfig.animation, msg.isHighlight && "highlighted")} key={msg.id}>
        {msg.replyMsg !== null && <div className="reply">{msg.replyMsg}</div>}

        <div className="meta">
          {initialConfig.time && <span className="time">{msg.timestamp}</span>}
          {specs !== null && <span className="spec">[{specs}]</span>}
          <span className="author" style={{ color: msg.userColor }}>
            {msg.userName}
          </span>
        </div>

        <span className="text">{msg.isDeleted ? <i className="del">Message was deleted</i> : msg.text}</span>
      </div>
    );
  });
};
