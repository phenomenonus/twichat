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
      <h4>Welcome to the {channel}</h4>
      <p>There are no messages yet</p>
    </div>
  );
};
