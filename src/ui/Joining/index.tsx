import type React from "react";

import SpinnerSVg from "@/assets/fade-stagger-circles.svg?react";

type JoiningPropsType = {
  channel: string;
};

export const Joining: React.FC<JoiningPropsType> = ({ channel }) => {
  return (
    <div className="card">
      Connecting to <b>{channel}</b> channel <SpinnerSVg height={20} width={20} />
    </div>
  );
};
