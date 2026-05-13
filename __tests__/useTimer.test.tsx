import React, { useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import BackgroundTimer from "react-native-background-timer";
import KeepAwake from "react-native-keep-awake";
import { useTimer } from "../src/Features/Home/Hooks/useTimer";

jest.mock("react-native-background-timer", () => ({
  runBackgroundTimer: jest.fn(),
  stopBackgroundTimer: jest.fn(),
}));

jest.mock("react-native-keep-awake", () => ({
  activate: jest.fn(),
  deactivate: jest.fn(),
}));

const mockNotificationActions = {
  schedule: jest.fn().mockResolvedValue(undefined),
  cancel: jest.fn(),
};

jest.mock("../src/Shared/Hooks", () => ({
  useNotification: jest.fn(() => ({
    state: {
      timerFinishedNotificationId: "timer-finished-notification",
    },
    actions: mockNotificationActions,
  })),
}));

type TimerHookValue = ReturnType<typeof useTimer>;

type TimerHarnessProps = {
  initialValue: number;
  onFinish: jest.Mock;
  onRender: (value: TimerHookValue) => void;
};

function TimerHarness({ initialValue, onFinish, onRender }: Readonly<TimerHarnessProps>) {
  const value = useTimer({ initialValue, onFinish });

  useEffect(() => {
    onRender(value);
  }, [onRender, value]);

  return null;
}

describe("useTimer", () => {
  let renderer: ReactTestRenderer;
  let hookValue: TimerHookValue;
  let onFinish: jest.Mock;
  let backgroundTick: (() => void) | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, "now").mockReturnValue(1_000);
    backgroundTick = undefined;
    onFinish = jest.fn();

    jest.mocked(BackgroundTimer.runBackgroundTimer).mockImplementation((callback) => {
      backgroundTick = callback;
    });

    act(() => {
      renderer = create(
        <TimerHarness
          initialValue={120}
          onFinish={onFinish}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (renderer) {
      renderer.unmount();
    }
  });

  it("starts the timer, prevents sleep and schedules the notification", async () => {
    await act(async () => {
      hookValue.actions.startTimer();
    });

    expect(KeepAwake.activate).toHaveBeenCalledTimes(1);
    expect(BackgroundTimer.stopBackgroundTimer).toHaveBeenCalledTimes(1);
    expect(BackgroundTimer.runBackgroundTimer).toHaveBeenCalledTimes(1);
    expect(mockNotificationActions.schedule).toHaveBeenCalledWith({
      title: "Finished",
      body: "You can start another one",
      timestamp: 123000,
    });
  });

  it("pauses and resets the timer while cancelling the scheduled notification", () => {
    act(() => {
      hookValue.actions.incrementTime();
    });

    expect(hookValue.state.timeLeft).toBe(180);

    act(() => {
      hookValue.actions.pauseTimer();
    });

    expect(KeepAwake.deactivate).toHaveBeenCalledTimes(1);
    expect(BackgroundTimer.stopBackgroundTimer).toHaveBeenCalledTimes(1);
    expect(mockNotificationActions.cancel).toHaveBeenCalledWith(
      "timer-finished-notification"
    );

    act(() => {
      hookValue.actions.resetTimer();
    });

    expect(hookValue.state.timeLeft).toBe(120);
  });

  it("respects the lower bound when decrementing and formats time correctly", () => {
    expect(hookValue.state.formattedTime()).toBe("02:00");

    act(() => {
      hookValue.actions.decrementTime();
    });

    expect(hookValue.state.timeLeft).toBe(60);
    expect(hookValue.state.formattedTime()).toBe("01:00");

    act(() => {
      hookValue.actions.decrementTime();
    });

    expect(hookValue.state.timeLeft).toBe(60);
  });

  it("calls onFinish when the countdown reaches zero", async () => {
    act(() => {
      renderer.update(
        <TimerHarness
          initialValue={1}
          onFinish={onFinish}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });

    await act(async () => {
      hookValue.actions.startTimer();
    });

    act(() => {
      backgroundTick?.();
    });

    expect(hookValue.state.timeLeft).toBe(0);
    expect(onFinish).not.toHaveBeenCalled();

    act(() => {
      backgroundTick?.();
    });

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(KeepAwake.deactivate).toHaveBeenCalled();
  });
});
