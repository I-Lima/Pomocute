import notifee, {
  AlarmType,
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TriggerType,
} from "@notifee/react-native";
import { Platform } from "react-native";
import NotificationService from "../src/Shared/Services/NotificationService";

jest.mock("@notifee/react-native", () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    createChannel: jest.fn(),
    getNotificationSettings: jest.fn(),
    openAlarmPermissionSettings: jest.fn(),
    displayNotification: jest.fn(),
    createTriggerNotification: jest.fn(),
    cancelNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
  },
  AlarmType: {
    SET_EXACT_AND_ALLOW_WHILE_IDLE: "SET_EXACT_AND_ALLOW_WHILE_IDLE",
  },
  AndroidImportance: {
    HIGH: "HIGH",
  },
  AndroidNotificationSetting: {
    ENABLED: "ENABLED",
    NOT_SUPPORTED: "NOT_SUPPORTED",
    DISABLED: "DISABLED",
  },
  AuthorizationStatus: {
    AUTHORIZED: 1,
    PROVISIONAL: 2,
    DENIED: 0,
  },
  TriggerType: {
    TIMESTAMP: "TIMESTAMP",
  },
}));

describe("NotificationService", () => {
  const originalOs = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: "android",
    });
  });

  afterEach(() => {
    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: originalOs,
    });
  });

  it("shows a notification after ensuring permissions and channel creation", async () => {
    jest.mocked(notifee.requestPermission).mockResolvedValue({
      authorizationStatus: AuthorizationStatus.AUTHORIZED,
    } as never);

    await NotificationService.show({
      title: "Finished",
      body: "You can start another one",
    });

    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: "id-notification-channel-default",
      name: "Default Channel",
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500, 300, 500],
      sound: "default",
    });
    expect(notifee.displayNotification).toHaveBeenCalledWith({
      id: "timer-finished-notification",
      title: "Finished",
      body: "You can start another one",
      android: {
        channelId: "id-notification-channel-default",
        pressAction: { id: "default" },
      },
    });
  });

  it("schedules an exact alarm on Android when alarm permission is usable", async () => {
    jest.mocked(notifee.requestPermission).mockResolvedValue({
      authorizationStatus: AuthorizationStatus.AUTHORIZED,
      android: {
        alarm: AndroidNotificationSetting.ENABLED,
      },
    } as never);

    await NotificationService.schedule({
      title: "Finished",
      body: "You can start another one",
      timestamp: 42_000,
    });

    expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
      {
        id: "timer-finished-notification",
        title: "Finished",
        body: "You can start another one",
        android: {
          channelId: "id-notification-channel-default",
          pressAction: { id: "default" },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: 42_000,
        alarmManager: {
          type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
        },
      }
    );
  });

  it("does not use alarmManager outside Android exact-alarm scenarios", async () => {
    Object.defineProperty(Platform, "OS", {
      configurable: true,
      value: "ios",
    });

    jest.mocked(notifee.requestPermission).mockResolvedValue({
      authorizationStatus: AuthorizationStatus.AUTHORIZED,
    } as never);

    await NotificationService.schedule({
      title: "Finished",
      body: "You can start another one",
      timestamp: 42_000,
    });

    expect(notifee.createTriggerNotification).toHaveBeenCalledWith(
      expect.any(Object),
      {
        type: TriggerType.TIMESTAMP,
        timestamp: 42_000,
      }
    );
  });

  it("rejects when notifications are not authorized", async () => {
    jest.mocked(notifee.requestPermission).mockResolvedValue({
      authorizationStatus: AuthorizationStatus.DENIED,
    } as never);

    await expect(
      NotificationService.show({
        title: "Finished",
        body: "You can start another one",
      })
    ).rejects.toThrow("Notifications are not authorized on this device.");

    expect(notifee.displayNotification).not.toHaveBeenCalled();
  });
});
