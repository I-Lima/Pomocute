import React, { useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { useNavigation } from "@react-navigation/native";
import { UserSettingsContext } from "../src/Contexts";
import { useBootstrap } from "../src/Features/Bootstrap/Hooks/useBootstrap";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

type BootstrapValue = ReturnType<typeof useBootstrap>;

type HarnessProps = {
  contextValue: React.ContextType<typeof UserSettingsContext>;
  onRender: (value: BootstrapValue) => void;
};

function Harness({ contextValue, onRender }: Readonly<HarnessProps>) {
  return (
    <UserSettingsContext.Provider value={contextValue}>
      <InnerHarness onRender={onRender} />
    </UserSettingsContext.Provider>
  );
}

function InnerHarness({ onRender }: Readonly<{ onRender: (value: BootstrapValue) => void }>) {
  const value = useBootstrap();

  useEffect(() => {
    onRender(value);
  }, [onRender, value]);

  return null;
}

describe("useBootstrap", () => {
  let renderer: ReactTestRenderer;
  let hookValue: BootstrapValue;
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.mocked(useNavigation).mockReturnValue({
      navigate,
    } as never);
  });

  afterEach(() => {
    renderer?.unmount();
    jest.useRealTimers();
  });

  it("returns the primary color from context", () => {
    act(() => {
      renderer = create(
        <Harness
          contextValue={{
            state: {
              focusDuration: "25",
              breakDuration: "5",
              themeColor: 0,
              primaryColor: "#EF4444",
            },
            actions: {
              saveCustomStates: jest.fn(),
              loadCustomStates: jest.fn(),
            },
          }}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });

    expect(hookValue.state.primaryColor).toBe("#EF4444");
  });

  it("navigates to Home after one second when the primary color exists", () => {
    act(() => {
      renderer = create(
        <Harness
          contextValue={{
            state: {
              focusDuration: "25",
              breakDuration: "5",
              themeColor: 0,
              primaryColor: "#EF4444",
            },
            actions: {
              saveCustomStates: jest.fn(),
              loadCustomStates: jest.fn(),
            },
          }}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });

    act(() => {
      jest.advanceTimersByTime(999);
    });

    expect(navigate).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(navigate).toHaveBeenCalledWith("Home");
  });

  it("does not navigate when the primary color is missing", () => {
    act(() => {
      renderer = create(
        <Harness
          contextValue={{
            state: {
              focusDuration: "25",
              breakDuration: "5",
              themeColor: 0,
              primaryColor: "",
            },
            actions: {
              saveCustomStates: jest.fn(),
              loadCustomStates: jest.fn(),
            },
          }}
          onRender={(value) => {
            hookValue = value;
          }}
        />
      );
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(navigate).not.toHaveBeenCalled();
  });
});
