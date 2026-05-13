import React from "react";
import { act, create } from "react-test-renderer";
import Index from "../src";
import { useNotification } from "../src/Shared/Hooks";

const mockRoutes = jest.fn(() => null);
const mockProviders = jest.fn(({ children }) => children);
const mockInit = jest.fn();

jest.mock("../src/routes", () => ({
  __esModule: true,
  default: () => mockRoutes(),
}));

jest.mock("../src/Providers", () => ({
  Providers: (props: { children: React.ReactNode }) => mockProviders(props),
}));

jest.mock("../src/Shared/Hooks", () => ({
  useNotification: jest.fn(),
}));

describe("Index", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useNotification).mockReturnValue({
      state: {
        channelId: "default-channel",
        timerFinishedNotificationId: "notification-id",
      },
      actions: {
        show: jest.fn(),
        cancel: jest.fn(),
        cancelAll: jest.fn(),
        onForeground: jest.fn(),
        onBackground: jest.fn(),
        getSettings: jest.fn(),
        openAlarmPermissionSettings: jest.fn(),
        createChannel: jest.fn(),
        schedule: jest.fn(),
        init: mockInit,
      },
    });
  });

  it("initializes notifications and renders the app shell", () => {
    act(() => {
      create(<Index />);
    });

    expect(mockInit).toHaveBeenCalledTimes(1);
    expect(mockProviders).toHaveBeenCalledTimes(1);
    expect(mockRoutes).toHaveBeenCalledTimes(1);
  });
});
