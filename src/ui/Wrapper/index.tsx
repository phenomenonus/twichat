import React from "react";

import { useChatConnection } from "@/hooks";

import { Chat, Connecting, ErrorMessage, Joining, NoConnection } from "@/ui";

import type { InitialConfig } from "@/types";

type WrapperPropsType = {
  initialConfig: InitialConfig;
  elem: HTMLDivElement;
};

export const Wrapper: React.FC<WrapperPropsType> = ({ elem, initialConfig }) => {
  const ref = React.useRef<HTMLDivElement>(elem);
  const { client, connected, error, info, joined } = useChatConnection(initialConfig.channel);

  if (connected === null) return <NoConnection info={info} />;

  if (error !== null) return <ErrorMessage error={error} info={info} />;

  if (connected === false) return <Connecting />;

  if (joined === false) return <Joining channel={initialConfig.channel} />;

  return <Chat client={client} containerRef={ref} initialConfig={initialConfig} />;
};
