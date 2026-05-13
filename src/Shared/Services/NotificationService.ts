import notifee, {
  AlarmType,
  AndroidNotificationSetting,
  AndroidImportance,
  AuthorizationStatus,
  TriggerType,
} from "@notifee/react-native";
import { Platform } from "react-native";

class NotificationService {
  channelId = "id-notification-channel-default";
  timerFinishedNotificationId = "timer-finished-notification";

  init = async () => {
    const settings = await this.requestPermission();
    await this.createChannel();

    return settings;
  };

  requestPermission = async () => {
    return notifee.requestPermission();
  };

  createChannel = async () => {
    await notifee.createChannel({
      id: this.channelId,
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500, 300, 500],
      sound: "default",
    });
  };

  getSettings = async () => {
    return notifee.getNotificationSettings();
  };

  openAlarmPermissionSettings = async () => {
    await notifee.openAlarmPermissionSettings();
  };

  private isNotificationAuthorized = (
    authorizationStatus: AuthorizationStatus
  ) =>
    authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    authorizationStatus === AuthorizationStatus.PROVISIONAL;

  private canUseExactAlarm = (
    alarmSetting: AndroidNotificationSetting | undefined
  ) => {
    if (Platform.OS !== "android") {
      return false;
    }

    return (
      alarmSetting === undefined ||
      alarmSetting === AndroidNotificationSetting.ENABLED ||
      alarmSetting === AndroidNotificationSetting.NOT_SUPPORTED
    );
  };

  private ensureReady = async () => {
    const settings = await this.requestPermission();

    if (!this.isNotificationAuthorized(settings.authorizationStatus)) {
      throw new Error("Notifications are not authorized on this device.");
    }

    await this.createChannel();

    return settings;
  };

  show = async ({ title, body }: { title: string; body: string }) => {
    await this.ensureReady();

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
    const settings = await this.ensureReady();
    const canUseExactAlarm = this.canUseExactAlarm(settings.android?.alarm);

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
        ...(canUseExactAlarm
          ? {
              alarmManager: {
                type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
              },
            }
          : {}),
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
