import { useCallback, useEffect, useState } from "react";
import BackgroundTimer from "react-native-background-timer";
import KeepAwake from "react-native-keep-awake";
import { UseTimerParams } from "../Types";

function cleanup() {
  KeepAwake.deactivate();
  BackgroundTimer.stopBackgroundTimer();
}

export function useTimer(params: Readonly<UseTimerParams>) {
  const { initialValue, onFinish } = params;
  const [timeLeft, setTimeLeft] = useState(initialValue);

  useEffect(() => setTimeLeft(initialValue), [initialValue]);

  const startBackgroundTicker = useCallback(() => {
    BackgroundTimer.stopBackgroundTimer();

    BackgroundTimer.runBackgroundTimer(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          cleanup();
          onFinish();
          return prevTime;
        }

        return prevTime - 1;
      });
    }, 1000);
  }, [onFinish]);

  const startTimer = useCallback(
    (removeInitialCall = false) => {
      if (!removeInitialCall) {
        KeepAwake.activate();
      }

      startBackgroundTicker();
    },
    [startBackgroundTicker]
  );

  const pauseTimer = useCallback(() => {
    KeepAwake.deactivate();
    BackgroundTimer.stopBackgroundTimer();
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialValue);
    cleanup();
  }, [initialValue]);

  const incrementTime = useCallback(() => {
    setTimeLeft((prevTime) => prevTime + 60);
  }, []);

  const decrementTime = useCallback(() => {
    if (timeLeft > 60) {
      setTimeLeft((prevTime) => prevTime - 60);
    }
  }, [timeLeft]);

  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }, [timeLeft]);

  return {
    state: {
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
