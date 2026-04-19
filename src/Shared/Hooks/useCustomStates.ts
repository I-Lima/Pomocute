import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { InitialStateParams, SaveCustomStateParams } from "./types";
import { colors } from "../Theme";
import { colorPalettes } from "../Theme/colorPalettes";

const INITIAL_STATE: InitialStateParams = {
  focusDuration: "25",
  breakDuration: "5",
  themeColor: 0,
  primaryColor: colors.primary,
};

export default function useCustomStates() {
  const [focusDuration, setFocusDuration] = useState(
    INITIAL_STATE.focusDuration
  );
  const [breakDuration, setBreakDuration] = useState(
    INITIAL_STATE.breakDuration
  );
  const [themeColor, setThemeColor] = useState(INITIAL_STATE.themeColor);
  const [primaryColor, setPrimaryColor] = useState(INITIAL_STATE.primaryColor);

  const saveCustomStates = (data: SaveCustomStateParams) => {
    setFocusDuration(data.focusDuration);
    setBreakDuration(data.breakDuration);
    setThemeColor(data.themeColor);
    setPrimaryColor(colorPalettes[data.themeColor].color);

    AsyncStorage.setItem("customStates", JSON.stringify(data));
  };

  const loadCustomStates = async () => {
    const jsonValue = await AsyncStorage.getItem("customStates");
    return jsonValue == null ? INITIAL_STATE : JSON.parse(jsonValue);
  };

  useEffect(() => {
    loadCustomStates().then((data) => {
      setFocusDuration(data.focusDuration);
      setBreakDuration(data.breakDuration);
      setThemeColor(data.themeColor);
      setPrimaryColor(colorPalettes[data.themeColor].color);
    });
  }, []);

  return useMemo(() => {
    return {
      state: {
        focusDuration,
        breakDuration,
        themeColor,
        primaryColor,
      }, // State
      actions: {
        saveCustomStates,
      }, // Actions
    };
  }, [breakDuration, focusDuration, themeColor, primaryColor]);
}
