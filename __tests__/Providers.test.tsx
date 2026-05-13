import React from "react";
import { create } from "react-test-renderer";
import { Providers } from "../src/Providers";

const mockNavigationContainer = jest.fn(({ children }) => children);
const mockUserSettingsProvider = jest.fn(({ children }) => children);

jest.mock("@react-navigation/native", () => ({
  NavigationContainer: (props: { children: React.ReactNode }) =>
    mockNavigationContainer(props),
}));

jest.mock("../src/Providers/userSettingsProvider", () => ({
  UserSettingsProvider: (props: { children: React.ReactNode }) =>
    mockUserSettingsProvider(props),
}));

describe("Providers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("wraps the children with user settings and navigation providers", () => {
    const renderer = create(
      <Providers>
        <React.Fragment />
      </Providers>
    );

    expect(mockUserSettingsProvider).toHaveBeenCalledTimes(1);
    expect(mockNavigationContainer).toHaveBeenCalledTimes(1);
    expect(renderer.toJSON()).toBeNull();
  });
});
