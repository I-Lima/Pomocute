import { useEffect, useState } from "react";
import BackgroundTimer from "react-native-background-timer";
import KeepAwake from "react-native-keep-awake";
import { InputUseTimer } from "../types";

export function useTimer(input: InputUseTimer) {
  const {
    initialValue,
    isPlayingCallback,
    hasStartedCallback,
    changeFlowCallback,
  } = input;
  const [timeLeft, setTimeLeft] = useState(initialValue);

  useEffect(() => setTimeLeft(initialValue), [initialValue]);

  function startTimer(): void {
    isPlayingCallback();
    KeepAwake.activate();

    BackgroundTimer.runBackgroundTimer(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          BackgroundTimer.stopBackgroundTimer();
          changeFlowCallback();
          return prevTime;
        }

        return prevTime - 1;
      });
    }, 1000);
  }

  function pauseTimer(): void {
    isPlayingCallback();
    KeepAwake.deactivate();
    BackgroundTimer.stopBackgroundTimer();
  }

  function resetTimer(): void {
    hasStartedCallback();
    setTimeLeft(initialValue);

    KeepAwake.deactivate();
    BackgroundTimer.stopBackgroundTimer();
  }

  function incrementTime(): void {
    setTimeLeft((prevTime) => prevTime + 60);
  }

  function decrementTime(): void {
    if (timeLeft > 60) {
      setTimeLeft((prevTime) => prevTime - 60);
    }
  }

  function formattedTime(): string {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  return {
    state: {
      timeLeft,
      formattedTime,
    },
    actions: {
      startTimer,
      pauseTimer,
      resetTimer,
      incrementTime,
      decrementTime,
    },
  };
}
