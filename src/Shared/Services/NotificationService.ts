import notifee, {
  AlarmType,
  AndroidImportance,
  TriggerType,
} from "@notifee/react-native";

class NotificationService {
  channelId = "id-notification-channel-default";
  timerFinishedNotificationId = "timer-finished-notification";

  init = async () => {
    await this.requestPermission();
    await this.createChannel();
  };

  requestPermission = async () => {
    await notifee.requestPermission();
  };

  createChannel = async () => {
    await notifee.createChannel({
      id: this.channelId,
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      sound: "default",
    });
  };

  show = async ({ title, body }: { title: string; body: string }) => {
    await notifee.displayNotification({
      id: this.timerFinishedNotificationId,
      title,
      body,
      android: {
        channelId: this.channelId,
        pressAction: { id: "default" },
      },
    });
  };

  schedule = async ({
    title,
    body,
    timestamp,
  }: {
    title: string;
    body: string;
    timestamp: number;
  }) => {
    await notifee.createTriggerNotification(
      {
        id: this.timerFinishedNotificationId,
        title,
        body,
        android: {
          channelId: this.channelId,
          pressAction: { id: "default" },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp,
        alarmManager: {
          type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
        },
      }
    );
  };

  cancel = async (id: string) => {
    await notifee.cancelNotification(id);
  };

  cancelAll = async () => {
    await notifee.cancelAllNotifications();
  };

  onForeground = (callback: () => void) => {
    return notifee.onForegroundEvent(callback);
  };

  onBackground = (callback: () => Promise<void>) => {
    notifee.onBackgroundEvent(callback);
  };
}

export default new NotificationService();
