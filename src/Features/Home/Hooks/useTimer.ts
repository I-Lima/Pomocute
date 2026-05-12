import { useCallback, useEffect, useState } from "react";
import BackgroundTimer from "react-native-background-timer";
import KeepAwake from "react-native-keep-awake";
import { UseTimerParams } from "../Types";
import { useNotification } from "../../../Shared/Hooks";

function cleanup() {
  KeepAwake.deactivate();
  BackgroundTimer.stopBackgroundTimer();
}

export function useTimer(params: Readonly<UseTimerParams>) {
  const { initialValue, onFinish } = params;
  const [timeLeft, setTimeLeft] = useState(initialValue);

  const { state: notificationState, actions: notificationActions } =
    useNotification();

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
      void notificationActions
        .schedule({
          title: "Finished",
          body: "You can start another one",
          timestamp: Date.now() + timeLeft * 1000 + 2000,
        })
        .catch((error: unknown) => {
          console.warn("Failed to schedule notification", error);
        });

      startBackgroundTicker();
    },
    [notificationActions, startBackgroundTicker, timeLeft]
  );

  const pauseTimer = useCallback(() => {
    KeepAwake.deactivate();
    BackgroundTimer.stopBackgroundTimer();
    notificationActions.cancel(notificationState.timerFinishedNotificationId);
  }, [notificationActions, notificationState.timerFinishedNotificationId]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialValue);
    cleanup();
    notificationActions.cancel(notificationState.timerFinishedNotificationId);
  }, [
    initialValue,
    notificationActions,
    notificationState.timerFinishedNotificationId,
  ]);

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
      timeLeft,
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
