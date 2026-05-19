export type MessageType = {
  id: string;
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
