import React from "react";

import { ChatClient } from "@twurple/chat";

export type UseChatConnectionAwaitResult = {
  client: ChatClient | null;
  connected: boolean;
  error: Error | null;
};

/**
 * Custom hook to connect to a Twitch chat channel using Twurple.
 * Returns stable state for rendering without exposing refs directly.
 */
export function useChatConnectionAwait(channel: string): UseChatConnectionAwaitResult {
  const clientRef = React.useRef<ChatClient | null>(null);
  const pollRef = React.useRef<number | null>(null);
  const cleanupRequestedRef = React.useRef(false);
  const cleanedRef = React.useRef(false);

  // Component-visible state
  const [state, setState] = React.useState<UseChatConnectionAwaitResult>({
    client: null,
    connected: false,
    error: null,
  });

  React.useEffect(() => {
    cleanedRef.current = false;
    cleanupRequestedRef.current = false;

    // Reset state asynchronously to avoid cascading renders
    setTimeout(() => {
      setState({ client: null, connected: false, error: null });
    });

    const client = new ChatClient({ channels: [channel] });
    clientRef.current = client;

    try {
      client.connect();
    } catch (e) {
      // Defer state update to avoid synchronous setState
      setTimeout(() => {
        setState({ client: null, connected: false, error: e as Error });
      });
      clientRef.current = null;
      return;
    }

    // Poll connection status every 500ms
    const poll = () => {
      if (cleanedRef.current) return;
      const c = clientRef.current;
      if (!c) return;

      if (c.isConnected) {
        setTimeout(() => {
          setState({ client: c, connected: true, error: null });
        });

        if (cleanupRequestedRef.current) {
          try {
            c.quit();
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("deferred quit failed", e);
          }
          clientRef.current = null;
        }
        return; // stop polling
      }

      // Continue polling
      pollRef.current = window.setTimeout(poll, 500);
    };

    pollRef.current = window.setTimeout(poll, 500);

    return () => {
      if (cleanedRef.current) return;
      cleanedRef.current = true;

      // Stop polling
      if (pollRef.current !== null) {
        clearTimeout(pollRef.current);
        pollRef.current = null;
      }

      const c = clientRef.current;
      if (!c) return;

      // Quit immediately if connected
      if (c.isConnected) {
        try {
          c.quit();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("quit failed", e);
        }
        clientRef.current = null;
        return;
      }

      // If still connecting, mark cleanup requested
      if (c.isConnecting) {
        cleanupRequestedRef.current = true;
        return;
      }

      clientRef.current = null;
    };
  }, [channel]);

  // Return stable state for rendering
  return state;
}
