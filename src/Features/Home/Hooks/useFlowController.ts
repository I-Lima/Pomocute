import { useCallback, useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import { UseFlowControllerParams } from "../Types";
import { useNotification } from "../../../Shared/Hooks";

export function useFlowController(params: Readonly<UseFlowControllerParams>) {
  const { customState, onFinishTimer, onFinishStep } = params;
  const [initialTime, setInitialTime] = useState(
    Number(customState.focusDuration) * 60
  );
  const [steps, setSteps] = useState(0);
  const [flow, setFlow] = useState<"focus" | "break">("focus");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const { actions: notificationActions } = useNotification();

  const onFinish = () => {
    if (steps < 4) {
      onFinishTimer();

      notificationActions.show({
        title: flow === "focus" ? "Focus Finished" : "Break Finished",
        body: "You can start another one",
      });
    }
  };

  const { state: timerState, actions: timerActions } = useTimer({
    initialValue: initialTime,
    onFinish,
  });

  useEffect(() => {
    setInitialTime(
      flow === "focus"
        ? Number(customState.focusDuration) * 60
        : Number(customState.breakDuration) * 60
    );
  }, [flow, customState.focusDuration, customState.breakDuration]);

  const changeIsPlaying = useCallback(
    (value?: boolean) => {
      if (value !== undefined) {
        setIsPlaying(value);
        return;
      }
      setIsPlaying(!isPlaying);
    },
    [isPlaying]
  );

  const changeHasStarted = useCallback(
    (value?: boolean) => {
      if (value !== undefined) {
        setHasStarted(value);
        return;
      }
      setHasStarted(!hasStarted);
    },
    [hasStarted]
  );

  const changeFlow = useCallback(
    (value?: "focus" | "break") => {
      if (value) {
        setSteps(0);
        setFlow(value);
        return;
      }

      if (flow === "focus") {
        setSteps(steps + 1);
      }
      setFlow(flow === "focus" ? "break" : "focus");
    },
    [flow, steps]
  );

  const playClick = useCallback(
    (value = true) => {
      changeHasStarted(true);
      changeIsPlaying(value);
      timerActions.startTimer();
    },
    [changeHasStarted, changeIsPlaying, timerActions]
  );

  const pauseClick = useCallback(() => {
    timerActions.pauseTimer();
    changeIsPlaying(false);
  }, [changeIsPlaying, timerActions]);

  const resetClick = useCallback(
    (resetCycle?: boolean) => {
      if (resetCycle) {
        setSteps(1);
      }
      changeIsPlaying(false);
      changeHasStarted(false);
      timerActions.resetTimer();
    },
    [changeHasStarted, changeIsPlaying, timerActions]
  );

  useEffect(() => {
    if (steps === 4) {
      onFinishStep();
      notificationActions.show({
        title: "Focus Finished",
        body: "You can start another one",
      });
    }
  }, [steps, onFinishStep, notificationActions]);

  return {
    state: {
      flow,
      time: timerState.formattedTime,
      timeLeft: timerState.timeLeft,
      initialTime,
      isPlaying,
      hasStarted,
    },
    actions: {
      playClick,
      pauseClick,
      resetClick,
      changeFlow,
    },
  };
}
