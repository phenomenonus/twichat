export type MessageType = {
  id: string;
  /**
   * HH:MM:SS
   * 08:14:55
   */
  date: string;
  /**
   * ♪
   */
  isSubscriber: boolean;
  /**
   * ⚡
   */
  isFirst: boolean;
  /**
   * M
   */
  isMod: boolean;
  /**
   * L
   */
  isLeadMod: boolean;
  /**
   * ⛵
   */
  isVip: boolean;
  /**
   * Username color
   */
  userColor: string;
  /**
   * Username
   */
  userName: string;
  /**
   * Message text
   */
  text: string;
  /**
   * Whether the message is highlighted by using channel points.
   */
  isHighlight: boolean;
  /**
   * The name of the user that wrote the message that this message is a reply to, and the text of the message that this message is a reply to, or `null` if it's not a reply.
   */
  replyMsg: string | null;
};
