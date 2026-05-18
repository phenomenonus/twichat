import type React from "react";

import SpinnerSVg from "@/assets/fade-stagger-circles.svg?react";

export const Connecting: React.FC = () => {
  return (
    <div className="card">
      Connecting to Twitch chat <SpinnerSVg height={20} width={20} />
    </div>
  );
};
