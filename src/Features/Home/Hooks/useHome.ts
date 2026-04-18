import { useState } from "react";
import { Dimensions } from "react-native";

export default function useHome() {
  const { width } = Dimensions.get("screen");
  const ratio = width * 0.8;

  const [showSettings, setShowSettings] = useState(false);
  const [flow, setFlow] = useState<"focus" | "break">("focus");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const settingsButtonClick = () => setShowSettings(!showSettings);
  const setSettingsVisible = (visible: boolean) => setShowSettings(visible);
  const changeHasStarted = () => {
    setHasStarted(!hasStarted);
    if (isPlaying) {
      changeIsPlaying();
    }
  };
  const changeIsPlaying = () => {
    setIsPlaying(!isPlaying);
    if (!hasStarted) {
      changeHasStarted();
    }
  };
  const changeFlow = () => {
    setFlow(flow === "focus" ? "break" : "focus");
    if (hasStarted) {
      changeHasStarted();
    }
  };

  return {
    state: {
      width,
      ratio,
      showSettings,
      flow,
      isPlaying,
      hasStarted,
    },
    actions: {
      settingsButtonClick,
      setSettingsVisible,
      changeFlow,
      changeIsPlaying,
      changeHasStarted,
    },
  };
}
