import React, { useContext, useEffect } from "react";
import { act, create, ReactTestRenderer } from "react-test-renderer";
import { UserSettingsProvider } from "../src/Providers/userSettingsProvider";
import { UserSettingsContext } from "../src/Contexts";
import { useUserSettings } from "../src/Shared/Hooks";

jest.mock("../src/Shared/Hooks", () => ({
  useUserSettings: jest.fn(),
}));

function Consumer({
  onValue,
}: Readonly<{ onValue: (value: React.ContextType<typeof UserSettingsContext>) => void }>) {
  const value = useContext(UserSettingsContext);

  useEffect(() => {
    onValue(value);
  }, [onValue, value]);

  return null;
}

describe("UserSettingsProvider", () => {
  let renderer: ReactTestRenderer;
  const providerValue = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useUserSettings).mockReturnValue(providerValue);
  });

  afterEach(() => {
    renderer.unmount();
  });

  it("loads persisted settings on mount", () => {
    act(() => {
      renderer = create(
        <UserSettingsProvider>
          <Consumer onValue={jest.fn()} />
        </UserSettingsProvider>
      );
    });

    expect(providerValue.actions.loadCustomStates).toHaveBeenCalledTimes(1);
  });

  it("provides the hook value through context", () => {
    const onValue = jest.fn();

    act(() => {
      renderer = create(
        <UserSettingsProvider>
          <Consumer onValue={onValue} />
        </UserSettingsProvider>
      );
    });

    expect(onValue).toHaveBeenLastCalledWith(providerValue);
  });
});
