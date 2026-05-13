import { useNotification } from "../src/Shared/Hooks/useNotification";
import { NotificationService } from "../src/Shared/Services";

jest.mock("../src/Shared/Services", () => ({
  NotificationService: {
    channelId: "default-channel",
    timerFinishedNotificationId: "notification-id",
    schedule: jest.fn(),
    cancel: jest.fn(),
    cancelAll: jest.fn(),
    onForeground: jest.fn(),
    onBackground: jest.fn(),
    getSettings: jest.fn(),
    openAlarmPermissionSettings: jest.fn(),
    createChannel: jest.fn(),
    init: jest.fn(),
  },
}));

describe("useNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exposes the notification identifiers from the service", () => {
    const value = useNotification();

    expect(value.state.channelId).toBe("default-channel");
    expect(value.state.timerFinishedNotificationId).toBe("notification-id");
  });

  it("delegates show to schedule with the same payload", () => {
    const value = useNotification();

    value.actions.show({
      title: "Finished",
      body: "You can start another one",
      timestamp: 10_000,
    });

    expect(NotificationService.schedule).toHaveBeenCalledWith({
      title: "Finished",
      body: "You can start another one",
      timestamp: 10_000,
    });
  });

  it("exposes the service actions directly", () => {
    const value = useNotification();

    expect(value.actions.cancel).toBe(NotificationService.cancel);
    expect(value.actions.cancelAll).toBe(NotificationService.cancelAll);
    expect(value.actions.onForeground).toBe(NotificationService.onForeground);
    expect(value.actions.onBackground).toBe(NotificationService.onBackground);
    expect(value.actions.getSettings).toBe(NotificationService.getSettings);
    expect(value.actions.openAlarmPermissionSettings).toBe(
      NotificationService.openAlarmPermissionSettings
    );
    expect(value.actions.createChannel).toBe(NotificationService.createChannel);
    expect(value.actions.init).toBe(NotificationService.init);
    expect(value.actions.schedule).toBe(NotificationService.schedule);
  });
});
