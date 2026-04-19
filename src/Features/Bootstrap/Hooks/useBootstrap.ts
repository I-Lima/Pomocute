import { Dimensions } from "react-native";

export function useBootstrap() {
  const { width } = Dimensions.get("screen");

  return {
    state: {
      width,
    },
    actions: {},
  };
}
