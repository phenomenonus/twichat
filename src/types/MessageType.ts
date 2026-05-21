export type RaidMessageType =
  | {
      /**
       * Is canceled raid by user.
       */
      isCanceled: false;
      /**
       * The display name of the raider.
       */
      userName: string;
      /**
       * The number of viewers joining with the raid.
       */
      viewerCount: number;
    }
  | {
      /**
       * Is canceled raid by user.
       */
      isCanceled: true;
      /**
       * The display name of the raider.
       */
      userName: string;
    };

export type MessageType = {
  id: string;
  /**
   * Indicates whether the user's message was deleted (message delete event, user ban, etc.).
   */
  isDeleted: boolean;
  /**
   * ⚡
   */
  isFirst: boolean;
  /**
   * Whether the message is highlighted by using channel points.
   */
  isHighlight: boolean;
  /**
   * L
   */
  isLeadMod: boolean;
  /**
   * M
   */
  isMod: boolean;
  /**
   * Include raid message data. null - not a raid message
   */
  raidMsg: RaidMessageType | null;
  /**
   * ♪
   */
  isSubscriber: boolean;
  /**
   * ⛵
   */
  isVip: boolean;
  /**
   * The name of the user that wrote the message that this message is a reply to, and the text of the message that this message is a reply to, or `null` if it's not a reply.
   */
  replyMsg: string | null;
  /**
   * Message text
   */
  text: string;
  /**
   * HH:MM:SS
   * 08:14:55
   */
  timestamp: string;
  /**
   * Username
   */
  userName: string;
  /**
   * Username color
   */
  userColor: string;
};
