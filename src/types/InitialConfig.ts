import type { AnimationType } from "./AnimationType";
import type { BGType } from "./BGType";
import type { ColorNameType } from "./ColorNamesType";
import type { ThemeType } from "./ThemeType";

export type InitialConfig = {
  /**
   * Message animation.
   * @default "fadein"
   */
  animation: AnimationType;
  /**
   * User channel.
   * @requires
   */
  channel: string;
  /**
   * Chat background color.
   * @default "transparent"
   */
  chat_bg: BGType;
  /**
   * Type of colored usernames.
   */
  cu_name: ColorNameType;
  /**
   * Default color for username. It also is ised for "static" colored usernames.
   * @default "custom"
   */
  du_color: string;
  /**
   * Font size(in pixels). Helps to scale content.
   * @default 16
   */
  f_size: number | null;
  /**
   * How often updates(flush) new messages in chat.
   * @default 300
   */
  interval: number;
  /**
   * Maximum messages in chat in runtime.
   * @default 50
   */
  limit: number;
  /**
   * Message background color.
   * @default "transparent"
   */
  msg_bg: BGType;
  /**
   * If true, it shows special icons in users messages to see their meta data(e.g., subscriber, first message, etc.).
   * @default true
   */
  spec: boolean;
  /**
   * Placeholder helps display the chat size. Use it to adjust the chat position on the screen.
   * @default false
   */
  placeholder: boolean;
  /**
   * @default "dark"
   */
  theme: ThemeType;
  /**
   * If true, it shows the time the message was received.
   * @default false
   */
  time: boolean;
  /**
   * Use this name for user without names.
   * @default "__ufo"
   */
  uu_name: string;
};
