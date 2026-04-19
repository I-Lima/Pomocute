import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { colors, colorPalettes } from "../Theme";
import {
  InitialStateParams,
  useUserSettingsParams,
} from "../../Features/Home/Types";

export const INITIAL_STATE: InitialStateParams = {
  focusDuration: "25",
  breakDuration: "5",
  themeColor: 0,
  primaryColor: colors.primary,
};

export function useUserSettings() {
  const [focusDuration, setFocusDuration] = useState(
    INITIAL_STATE.focusDuration
  );
  const [breakDuration, setBreakDuration] = useState(
    INITIAL_STATE.breakDuration
  );
  const [themeColor, setThemeColor] = useState(INITIAL_STATE.themeColor);
  const [primaryColor, setPrimaryColor] = useState("");

  const saveCustomStates = (data: Readonly<useUserSettingsParams>) => {
    setFocusDuration(data.focusDuration);
    setBreakDuration(data.breakDuration);
    setThemeColor(data.themeColor);
    setPrimaryColor(colorPalettes[data.themeColor].color);

    AsyncStorage.setItem("customStates", JSON.stringify(data));
  };

  const loadCustomStates = async () => {
    const data = await AsyncStorage.getItem("customStates");
    const jsonValue = data === null ? INITIAL_STATE : JSON.parse(data);

    setFocusDuration(jsonValue.focusDuration);
    setBreakDuration(jsonValue.breakDuration);
    setThemeColor(jsonValue.themeColor);
    setPrimaryColor(colorPalettes[jsonValue.themeColor].color);
  };

  return {
    state: {
      focusDuration,
      breakDuration,
      themeColor,
      primaryColor,
    }, // State
    actions: {
      saveCustomStates,
      loadCustomStates,
    }, // Actions
  };
}
