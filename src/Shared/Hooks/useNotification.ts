import { AppState } from "react-native";
import { useEffect, useRef } from "react";
import { NotificationService } from "../Services";

export function useNotification() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      appState.current = nextState;
    });

    return () => sub.remove();
  }, []);

  const canNotify = () => appState.current !== "active";

  const show = (payload: { title: string; body: string }) => {
    if (canNotify()) {
      NotificationService.show(payload);
    }
  };

  return {
    state: {},
    actions: {
      show,
      cancel: NotificationService.cancel,
      cancelAll: NotificationService.cancelAll,
      onForeground: NotificationService.onForeground,
      onBackground: NotificationService.onBackground,
      createChannel: NotificationService.createChannel,
      init: NotificationService.init,
    },
  };
}
