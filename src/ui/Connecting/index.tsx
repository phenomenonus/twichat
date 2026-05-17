import type React from "react";

import SpinnerSVg from "@/assets/fade-stagger-circles.svg?react";

type ConnectingPropsType = {
  channel: string;
};

export const Connecting: React.FC<ConnectingPropsType> = ({ channel }) => {
  return (
    <div className="card">
      Connecting to <b>{channel}</b> chat <SpinnerSVg height={20} width={20} />
    </div>
  );
};
