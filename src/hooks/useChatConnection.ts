import React from "react";

import { ChatClient } from "@twurple/chat";

export type ConnectionStateType = {
  /**
   * false - chat is connecting; true - chat establish connection; null - no connection events
   */
  connected: boolean | null;
  /**
   * Whether the user joined the channel
   */
  joined: boolean;
  /**
   * Additional information about connection
   */
  message: string | null;
  /**
   * Error message
   */
  error: string | null;
};

export type UseChatConnectionAwaitResult = {
  client: ChatClient | null;
} & ConnectionStateType;

export function useChatConnection(channel: string): UseChatConnectionAwaitResult {
  const [state, setState] = React.useState<ConnectionStateType>({
    connected: false,
    error: null,
    joined: false,
    message: null,
  });

  const client = React.useMemo(() => new ChatClient({ channels: [channel] }), [channel]);

  React.useEffect(() => {
    const onConnect = client.onConnect(() => {
      setState((s) => ({ ...s, connected: true }));
    });

    const onDisconnect = client.onDisconnect((manually, reason) => {
      setState({
        connected: null,
        error: reason === undefined ? null : `${reason.cause ?? reason.name}: ${reason.message}`,
        joined: false,
        message: `${manually ? "Client manually disconnected" : "Client automatically disconnected"}. Please check your internet connection and try again.`,
      });
    });

    const onJoin = client.onJoin(() => {
      setState((s) => ({ ...s, joined: true }));
    });

    const onJoinFailure = client.onJoinFailure((channel, reason) => {
      setState({
        connected: true,
        error: `Failed to join the ${channel} channel. [Reason: ${reason}]`,
        joined: false,
        message: "Please check the channel name or there may be a technical issue.",
      });
    });

    if (client.isConnecting === false && client.isConnected === false) {
      client.connect();
    }

    return () => {
      onConnect.unbind();
      onDisconnect.unbind();
      onJoin.unbind();
      onJoinFailure.unbind();

      if (client.isConnected) {
        client.quit();
      }
    };
  }, [client, channel]);

  return { client, ...state };
}
