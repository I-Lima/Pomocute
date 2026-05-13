import React, { useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserSettings } from "../src/Shared/Hooks/useUserSettings";
import { colors } from "../src/Shared/Theme";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

type UserSettingsValue = ReturnType<typeof useUserSettings>;

type HarnessProps = {
  onRender: (value: UserSettingsValue) => void;
};

function Harness({ onRender }: Readonly<HarnessProps>) {
  const value = useUserSettings();

  useEffect(() => {
    onRender(value);
  }, [onRender, value]);

  return null;
}

describe("useUserSettings", () => {
  let renderer: ReactTestRenderer;
  let hookValue: UserSettingsValue;

  beforeEach(() => {
    jest.clearAllMocks();

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

  it("starts with the configured default values", () => {
    expect(hookValue.state.focusDuration).toBe("25");
    expect(hookValue.state.breakDuration).toBe("5");
    expect(hookValue.state.themeColor).toBe(0);
    expect(hookValue.state.primaryColor).toBe("");
  });

  it("saves custom settings, updates local state and persists them", () => {
    act(() => {
      hookValue.actions.saveCustomStates({
        focusDuration: "50",
        breakDuration: "10",
        themeColor: 3,
      });
    });

    expect(hookValue.state.focusDuration).toBe("50");
    expect(hookValue.state.breakDuration).toBe("10");
    expect(hookValue.state.themeColor).toBe(3);
    expect(hookValue.state.primaryColor).toBe("#3B82F6");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "customStates",
      JSON.stringify({
        focusDuration: "50",
        breakDuration: "10",
        themeColor: 3,
      })
    );
  });

  it("loads the initial state when storage is empty", async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValue(null);

    await act(async () => {
      await hookValue.actions.loadCustomStates();
    });

    expect(hookValue.state.focusDuration).toBe("25");
    expect(hookValue.state.breakDuration).toBe("5");
    expect(hookValue.state.themeColor).toBe(0);
    expect(hookValue.state.primaryColor).toBe(colors.primary);
  });

  it("loads persisted settings and maps the selected palette color", async () => {
    jest.mocked(AsyncStorage.getItem).mockResolvedValue(
      JSON.stringify({
        focusDuration: "15",
        breakDuration: "3",
        themeColor: 5,
      })
    );

    await act(async () => {
      await hookValue.actions.loadCustomStates();
    });

    expect(hookValue.state.focusDuration).toBe("15");
    expect(hookValue.state.breakDuration).toBe("3");
    expect(hookValue.state.themeColor).toBe(5);
    expect(hookValue.state.primaryColor).toBe("#EC4899");
  });
});
