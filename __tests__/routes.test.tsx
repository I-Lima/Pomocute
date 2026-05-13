import React from "react";
import { create } from "react-test-renderer";
import * as NativeStack from "@react-navigation/native-stack";
import Routes from "../src/routes";

jest.mock("@react-navigation/native-stack", () => {
  const mockNavigator = jest.fn(({ children }) => children);
  const mockScreen = jest.fn(() => null);
  const mockCreateNativeStackNavigator = jest.fn(() => ({
    Navigator: (props: { children: React.ReactNode }) => mockNavigator(props),
    Screen: (props: unknown) => mockScreen(props),
  }));

  return {
    createNativeStackNavigator: mockCreateNativeStackNavigator,
    __mocks: {
      mockNavigator,
      mockScreen,
      mockCreateNativeStackNavigator,
    },
  };
});

jest.mock("../src/Features/Bootstrap/Screens/SplashScreen", () => "SplashScreen");
jest.mock("../src/Features/Home/Screens", () => "HomeScreen");

describe("Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("configures the stack with the expected initial route and screens", () => {
    const { __mocks } = NativeStack as typeof NativeStack & {
      __mocks: {
        mockNavigator: jest.Mock;
        mockScreen: jest.Mock;
        mockCreateNativeStackNavigator: jest.Mock;
      };
    };

    create(<Routes />);

    expect(__mocks.mockNavigator).toHaveBeenCalledWith(
      expect.objectContaining({
        initialRouteName: "SplashScreen",
        screenOptions: { headerShown: false },
      })
    );
    expect(__mocks.mockScreen).toHaveBeenCalledTimes(2);
    expect(__mocks.mockScreen).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: "Home",
      })
    );
    expect(__mocks.mockScreen).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: "SplashScreen",
      })
    );
  });
});
