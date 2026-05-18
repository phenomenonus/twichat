import type React from "react";

type WelcomeMessagePropsType = {
  /**
   * Channel name
   */
  channel: string;
};

export const WelcomeMessage: React.FC<WelcomeMessagePropsType> = ({ channel }) => {
  return (
    <div className="card">
      Welcome to the <b>{channel}</b>
    </div>
  );
};
