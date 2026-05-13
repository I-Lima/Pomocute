import React, { useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { UserSettingsContext } from "../src/Contexts";
import { useHome } from "../src/Features/Home/Hooks/useHome";
import { useFlowController } from "../src/Features/Home/Hooks";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

jest.mock("../src/Features/Home/Hooks", () => ({
  useFlowController: jest.fn(),
}));

type HomeValue = ReturnType<typeof useHome>;

type HarnessProps = {
  onRender: (value: HomeValue) => void;
};

function Harness({ onRender }: Readonly<HarnessProps>) {
  return (
    <UserSettingsContext.Provider
      value={{
        state: {
          focusDuration: "25",
          breakDuration: "5",
          themeColor: 2,
          primaryColor: "#10B981",
        },
        actions: {
          saveCustomStates: jest.fn(),
          loadCustomStates: jest.fn(),
        },
      }}
    >
      <InnerHarness onRender={onRender} />
    </UserSettingsContext.Provider>
  );
}

function InnerHarness({ onRender }: Readonly<HarnessProps>) {
  const value = useHome();

  useEffect(() => {
    onRender(value);
  }, [onRender, value]);

  return null;
}

describe("useHome", () => {
  let renderer: ReactTestRenderer;
  let hookValue: HomeValue;
  const flowActions = {
    playClick: jest.fn(),
    pauseClick: jest.fn(),
    resetClick: jest.fn(),
    changeFlow: jest.fn(),
  };
  let onFinishTimer: (() => void) | undefined;
  let onFinishStep: (() => void) | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useFlowController).mockImplementation((params) => {
      onFinishTimer = params.onFinishTimer;
      onFinishStep = params.onFinishStep;

      return {
        state: {
          flow: "focus",
          isPlaying: false,
          hasStarted: false,
          time: "25:00",
          initialTime: 1500,
          timeLeft: 1500,
        },
        actions: flowActions,
      };
    });

    act(() => {
      renderer = create(
        <Harness
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });
  });

  afterEach(() => {
    renderer.unmount();
  });

  it("exposes the derived geometry and current flow state", () => {
    expect(hookValue.state.ratio).toBe(hookValue.state.width * 0.8);
    expect(hookValue.state.radius).toBe(hookValue.state.ratio / 2 - 10);
    expect(hookValue.state.circumference).toBeCloseTo(
      2 * Math.PI * hookValue.state.radius,
      4
    );
    expect(hookValue.state.flow).toBe("focus");
    expect(hookValue.state.time).toBe("25:00");
    expect(hookValue.state.customState.primaryColor).toBe("#10B981");
  });

  it("delegates play, pause and reset to the flow controller", () => {
    act(() => {
      hookValue.actions.playClick();
      hookValue.actions.pauseClick();
      hookValue.actions.resetClick();
    });

    expect(flowActions.playClick).toHaveBeenCalledTimes(1);
    expect(flowActions.pauseClick).toHaveBeenCalledTimes(1);
    expect(flowActions.resetClick).toHaveBeenCalledTimes(1);
  });

  it("opens and closes the settings modal explicitly and by toggle", () => {
    act(() => {
      hookValue.actions.setSettingsVisible(true);
    });

    expect(hookValue.state.showSettings).toBe(true);

    act(() => {
      hookValue.actions.setSettingsVisible(false);
    });

    expect(hookValue.state.showSettings).toBe(false);

    act(() => {
      hookValue.actions.setSettingsVisible();
    });

    expect(hookValue.state.showSettings).toBe(true);
  });

  it("opens the finish modal when the timer callback is triggered", () => {
    act(() => {
      onFinishTimer?.();
    });

    expect(hookValue.state.showModal).toBe(true);
  });

  it("opens the cycle-finished modal when the step callback is triggered", () => {
    act(() => {
      onFinishStep?.();
    });

    expect(hookValue.state.showFinishedModal).toBe(true);
  });

  it("handles the modal actions with the expected flow-controller calls", () => {
    act(() => {
      onFinishTimer?.();
    });

    act(() => {
      hookValue.actions.cancelModal();
    });

    expect(flowActions.changeFlow).toHaveBeenCalledWith("focus");
    expect(flowActions.resetClick).toHaveBeenCalledWith();
    expect(hookValue.state.showModal).toBe(false);

    act(() => {
      onFinishTimer?.();
    });

    act(() => {
      hookValue.actions.nextModal();
    });

    expect(flowActions.changeFlow).toHaveBeenCalledWith();
    expect(flowActions.playClick).toHaveBeenCalledWith(true);
    expect(hookValue.state.showModal).toBe(false);
  });

  it("handles the finished-cycle modal actions with the expected calls", () => {
    act(() => {
      onFinishStep?.();
    });

    act(() => {
      hookValue.actions.finishModal();
    });

    expect(flowActions.changeFlow).toHaveBeenCalledWith("focus");
    expect(hookValue.state.showFinishedModal).toBe(false);

    act(() => {
      onFinishStep?.();
    });

    act(() => {
      hookValue.actions.resetModal();
    });

    expect(flowActions.resetClick).toHaveBeenCalledWith(true);
    expect(flowActions.playClick).toHaveBeenCalledWith(true);
    expect(hookValue.state.showFinishedModal).toBe(false);
  });
});
