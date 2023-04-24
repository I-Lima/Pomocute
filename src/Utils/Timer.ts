import { useState } from "react";

// The function expects to receive an initialValue corresponding to the time in seconds
export function useTimer(initialValue: number) {
  const [timeLeft, setTimeLeft] = useState(initialValue);
  const [intervalId, setIntervalId] = useState(Number);

  function startTimer(): void {
    let id = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 0) {
          clearInterval(id);
          return prevTime;
        }

        return (prevTime - 1);
      });

    }, 1000);

    setIntervalId(id);
  };

  function pauseTimer(): void {
    clearInterval(intervalId);
  };

  function resetTimer(): void {
    setTimeLeft(initialValue);

    clearInterval(intervalId);
  };

  function incrementTime(): void {
    setTimeLeft(prevTime => prevTime + 60);
  };

  function decrementTime(): void {
    if (timeLeft > 60) {
      setTimeLeft(prevTime => prevTime - 60);
    }
  };

  function formattedTime(): string {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return {
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
    incrementTime,
    decrementTime,
    formattedTime
  };
};
