import React from "react";

import { initializeSettting, readInitialConfigFromUrl } from "@/utils";

import { Preview, Wrapper } from "@/ui";

type AppPropsType = {
  elem: HTMLDivElement;
};

export const App: React.FC<AppPropsType> = ({ elem }) => {
  const initialConfig = readInitialConfigFromUrl();
  initializeSettting(initialConfig, elem);

  if (!initialConfig.channel) return <Preview />;

  return <Wrapper elem={elem} initialConfig={initialConfig} />;
};
