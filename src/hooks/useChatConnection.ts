import React from "react";

import { ChatClient } from "@twurple/chat";

export type ConnectionStateType = {
  /**
   * false - chat is connecting; true - chat established connection; null - disconnected manually
   */
  connected: boolean | null;
  /**
   * Whether the user joined the channel
   */
  joined: boolean;
  /**
   * Additional information about connection
   */
  info: string | null;
  /**
   * Error message
   */
  error: string | null;
};

export type UseChatConnectionAwaitResult = {
  client: ChatClient;
} & ConnectionStateType;

export function useChatConnection(channel: string): UseChatConnectionAwaitResult {
  const [state, setState] = React.useState<ConnectionStateType>({
    connected: false,
    error: null,
    info: null,
    joined: false,
  });

  const client = React.useMemo(() => new ChatClient({ channels: [channel] }), [channel]);

  React.useEffect(() => {
    const onConnect = client.onConnect(() => {
      setState((s) => ({ ...s, connected: true, error: null, info: null }));
    });

    const onDisconnect = client.onDisconnect((manually, reason) => {
      setState({
        connected: manually ? null : false,
        error: reason === undefined ? null : `${reason.cause ?? reason.name}: ${reason.message}`,
        info: manually
          ? "Client manually disconnected"
          : "Client automatically disconnected. Your internet connection may have been interrupted or other technical issues may have occurred. If the connection is unavailable for a long time, try restarting the app.",
        joined: false,
      });
    });

    const onJoin = client.onJoin(() => {
      setState((s) => ({ ...s, joined: true }));
    });

    const onJoinFailure = client.onJoinFailure((channel, reason) => {
      setState((s) => ({
        ...s,
        error: `Failed to join the ${channel} channel. Reason: ${reason}`,
        info: "Please check the channel name or other technical issues may have occurred.",
        joined: false,
      }));
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
