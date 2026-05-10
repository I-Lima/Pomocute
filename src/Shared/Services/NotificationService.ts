import notifee, { AndroidImportance } from "@notifee/react-native";

class NotificationService {
  channelId = "id-notification-channel-default";

  async init() {
    await this.requestPermission();
    await this.createChannel();
  }

  async requestPermission() {
    await notifee.requestPermission();
  }

  async createChannel() {
    await notifee.createChannel({
      id: this.channelId,
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      sound: "default",
    });
  }

  async show({ title, body }: { title: string; body: string }) {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: this.channelId,
        pressAction: { id: "default" },
      },
    });
  }

  async cancel(id: string) {
    await notifee.cancelNotification(id);
  }

  async cancelAll() {
    await notifee.cancelAllNotifications();
  }

  onForeground(callback: () => void) {
    return notifee.onForegroundEvent(callback);
  }

  onBackground(callback: () => Promise<void>) {
    notifee.onBackgroundEvent(callback);
  }
}

export default new NotificationService();
