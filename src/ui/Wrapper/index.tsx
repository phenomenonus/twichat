import React from "react";

import { useChatConnectionAwait } from "@/hooks";

import { Chat } from "@/ui/Chat";
import { Connecting } from "@/ui/Connecting";
import { ErrorMessage } from "@/ui/ErrorMessage";

import type { InitialConfig } from "@/types";

type WrapperPropsType = {
  initialConfig: InitialConfig;
  elem: HTMLDivElement;
};

export const Wrapper: React.FC<WrapperPropsType> = ({ elem, initialConfig }) => {
  const ref = React.useRef<HTMLDivElement>(elem);
  const { client, connected, error } = useChatConnectionAwait(initialConfig.channel);

  if (error !== null) return <ErrorMessage error={error} />;

  if (connected === false) return <Connecting channel={initialConfig.channel} />;

  return (
    <Chat animation={initialConfig.animation} chatClient={client!} containerRef={ref} initialConfig={initialConfig} />
  );
};
