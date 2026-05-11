import { NotificationService } from "../Services";

export function useNotification() {
  const show = (payload: {
    title: string;
    body: string;
    timestamp: number;
  }) => {
    NotificationService.schedule(payload);
  };

  return {
    state: {
      channelId: NotificationService.channelId,
      timerFinishedNotificationId:
        NotificationService.timerFinishedNotificationId,
    },
    actions: {
      show,
      cancel: NotificationService.cancel,
      cancelAll: NotificationService.cancelAll,
      onForeground: NotificationService.onForeground,
      onBackground: NotificationService.onBackground,
      createChannel: NotificationService.createChannel,
      init: NotificationService.init,
      schedule: NotificationService.schedule,
    },
  };
}
