import React, { useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { useFlowController } from "../src/Features/Home/Hooks/useFlowController";
import { useTimer } from "../src/Features/Home/Hooks/useTimer";

jest.mock("../src/Features/Home/Hooks/useTimer", () => ({
  useTimer: jest.fn(),
}));

type FlowHookValue = ReturnType<typeof useFlowController>;

type FlowHarnessProps = {
  onFinishTimer: jest.Mock;
  onFinishStep: jest.Mock;
  onRender: (value: FlowHookValue) => void;
};

function FlowHarness({
  onFinishTimer,
  onFinishStep,
  onRender,
}: Readonly<FlowHarnessProps>) {
  const value = useFlowController({
    customState: {
      focusDuration: "25",
      breakDuration: "5",
      themeColor: 0,
    },
    onFinishTimer,
    onFinishStep,
  });

  useEffect(() => {
    onRender(value);
  }, [onRender, value]);

  return null;
}

describe("useFlowController", () => {
  const timerActions = {
    startTimer: jest.fn(),
    pauseTimer: jest.fn(),
    resetTimer: jest.fn(),
  };

  let renderer: ReactTestRenderer;
  let hookValue: FlowHookValue;
  let onFinishTimer: jest.Mock;
  let onFinishStep: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onFinishTimer = jest.fn();
    onFinishStep = jest.fn();

    jest.mocked(useTimer).mockImplementation(({ initialValue, onFinish }) => ({
      state: {
        formattedTime: () => `${initialValue}`,
        timeLeft: initialValue,
      },
      actions: {
        ...timerActions,
        __onFinish: onFinish,
      },
    }));

    act(() => {
      renderer = create(
        <FlowHarness
          onFinishTimer={onFinishTimer}
          onFinishStep={onFinishStep}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });
  });

  afterEach(() => {
    if (renderer) {
      renderer.unmount();
    }
  });

  it("starts in focus mode with the configured focus duration", () => {
    expect(hookValue.state.flow).toBe("focus");
    expect(hookValue.state.initialTime).toBe(1500);
    expect(hookValue.state.hasStarted).toBe(false);
    expect(hookValue.state.isPlaying).toBe(false);
  });

  it("plays and pauses the timer through the delegated timer actions", () => {
    act(() => {
      hookValue.actions.playClick();
    });

    expect(hookValue.state.hasStarted).toBe(true);
    expect(hookValue.state.isPlaying).toBe(true);
    expect(timerActions.startTimer).toHaveBeenCalledTimes(1);

    act(() => {
      hookValue.actions.pauseClick();
    });

    expect(hookValue.state.isPlaying).toBe(false);
    expect(timerActions.pauseTimer).toHaveBeenCalledTimes(1);
  });

  it("changes from focus to break and recalculates the initial duration", () => {
    act(() => {
      hookValue.actions.changeFlow();
    });

    expect(hookValue.state.flow).toBe("break");
    expect(hookValue.state.initialTime).toBe(300);
  });

  it("resets the state and can mark the cycle as completed", () => {
    act(() => {
      hookValue.actions.playClick();
    });

    act(() => {
      hookValue.actions.resetClick(true);
    });

    expect(hookValue.state.hasStarted).toBe(false);
    expect(hookValue.state.isPlaying).toBe(false);
    expect(timerActions.resetTimer).toHaveBeenCalledTimes(1);
  });

  it("calls the finish-step callback after the fourth focus cycle", () => {
    for (let index = 0; index < 7; index += 1) {
      act(() => {
        hookValue.actions.changeFlow();
      });
    }

    expect(onFinishStep).toHaveBeenCalledTimes(1);
  });

  it("calls the finish-timer callback while the pomodoro flow is still active", () => {
    const latestCall = jest.mocked(useTimer).mock.calls.at(-1);

    act(() => {
      latestCall?.[0].onFinish();
    });

    expect(onFinishTimer).toHaveBeenCalledTimes(1);
  });
});
