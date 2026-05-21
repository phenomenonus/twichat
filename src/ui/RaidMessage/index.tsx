import React from "react";

import type { RaidMessageType } from "@/types";

type RaidMessagePropsType = {
  raidMsg: RaidMessageType;
};

export const RaidMessage: React.FC<RaidMessagePropsType> = ({ raidMsg }) => {
  if (raidMsg.isCanceled) {
    return (
      <div className="raid">
        🔊 Raid was canceled by <b>{raidMsg.userName}</b>.
      </div>
    );
  }

  return (
    <div className="raid">
      🔊🎉 We got raided by <b>{raidMsg.userName}</b> with {raidMsg.viewerCount} viewers! Welcome everyone!
    </div>
  );
};
