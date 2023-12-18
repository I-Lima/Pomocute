import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ChangeModalVisible } from "../actions/modalActions";
import BackgroundTimer from "react-native-background-timer";
import KeepAwake from "react-native-keep-awake";

/**
 * The function receives the time value and returns the formatted count.
 * @param initialValue @number timer in seconds
 * @returns @string time count
 */
export function useTimer(initialValue: number) {
  const [timeLeft, setTimeLeft] = useState(initialValue);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeLeft(initialValue);
  }, [initialValue]);

  function startTimer(): void {
    KeepAwake.activate();

    BackgroundTimer.runBackgroundTimer(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          dispatch(ChangeModalVisible(true));
          BackgroundTimer.stopBackgroundTimer();
          return prevTime;
        }

        return prevTime - 1;
      });
    }, 1000);
  }

  function pauseTimer(): void {
    KeepAwake.deactivate();
    BackgroundTimer.stopBackgroundTimer();
  }

  function resetTimer(): void {
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
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
    incrementTime,
    decrementTime,
    formattedTime,
  };
}
