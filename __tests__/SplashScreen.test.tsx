import React from "react";
import { create } from "react-test-renderer";
import * as ReactNative from "react-native";
import SplashScreen from "../src/Features/Bootstrap/Screens/SplashScreen";
import { useBootstrap } from "../src/Features/Bootstrap/Hooks/useBootstrap";

jest.mock("../src/Features/Bootstrap/Hooks/useBootstrap", () => ({
  useBootstrap: jest.fn(),
}));

describe("SplashScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ReactNative, "useWindowDimensions").mockReturnValue({
      width: 360,
      height: 800,
      scale: 1,
      fontScale: 1,
    });
  });

  it("renders nothing until the primary color is available", () => {
    jest.mocked(useBootstrap).mockReturnValue({
      state: {
        primaryColor: undefined,
      },
      actions: {},
    });

    const renderer = create(<SplashScreen />);

    expect(renderer.toJSON()).toBeNull();
  });

  it("renders the loader with the selected background color", () => {
    jest.mocked(useBootstrap).mockReturnValue({
      state: {
        primaryColor: "#EF4444",
      },
      actions: {},
    });

    const renderer = create(<SplashScreen />);
    const tree = renderer.toJSON();

    expect(tree).not.toBeNull();
    expect((tree as any).props.style[1].backgroundColor).toBe("#EF4444");
    expect((tree as any).children).toHaveLength(1);
  });
});
