import React from "react";

import type { ChatClient } from "@twurple/chat";

import { cns, getSpecs } from "@/utils";

import { useAutoScroll, useMessages } from "@/hooks";

import { WelcomeMessage } from "@/ui/WelcomeMessage";

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

  return messages.map((item) => {
    const specs = initialConfig.spec ? getSpecs(item) : null;

    return (
      <div className={cns("msg", initialConfig.animation, item.isHighlight && "highlighted")} key={item.id}>
        {item.replyMsg !== null && <div className="reply">{item.replyMsg}</div>}

        <div className="meta">
          {initialConfig.time && <span className="time">{item.timestamp}</span>}
          {specs !== null && <span className="spec">[{specs}]</span>}
          <span className="author" style={{ color: item.userColor }}>
            {item.userName}
          </span>
        </div>

        <span className="text">{item.text}</span>
      </div>
    );
  });
};
