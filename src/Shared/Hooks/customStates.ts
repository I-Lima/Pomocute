import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { saveCustomStateData } from "./types";

const INITIAL_STATE: saveCustomStateData = {
  focusDuration: "25",
  breakDuration: "5",
  themeColor: 0,
};

export default function CustomStatesHook() {
  const [focusDuration, setFocusDuration] = useState(
    INITIAL_STATE.focusDuration
  );
  const [breakDuration, setBreakDuration] = useState(
    INITIAL_STATE.breakDuration
  );
  const [themeColor, setThemeColor] = useState(INITIAL_STATE.themeColor);

  const saveCustomStates = (data: saveCustomStateData) => {
    setFocusDuration(data.focusDuration);
    setBreakDuration(data.breakDuration);
    setThemeColor(data.themeColor);

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
    });
  }, []);

  return useMemo(() => {
    return {
      state: {
        focusDuration,
        breakDuration,
        themeColor,
      }, // State
      actions: {
        saveCustomStates,
      }, // Actions
    };
  }, [breakDuration, focusDuration, themeColor]);
}
