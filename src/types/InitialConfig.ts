import type { AnimationType } from "./AnimationType";
import type { ColorNameType } from "./ColorNamesType";

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
   * Add dark glass effect to the chat layout
   */
  glass: boolean;
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
   * If true, it shows the time the message was received.
   * @default true
   */
  time: boolean;
  /**
   * Use this name for user without names.
   * @default "__ufo"
   */
  uu_name: string;
};
