import { Ref, useEffect, useRef } from "react";
import { Animated } from "react-native";

import { UseAnimationParams } from "../Types";

export function useAnimation(params: Readonly<UseAnimationParams>) {
  const { circumference, isPlaying, hasStarted, initialTime } = params;

  const progress = useRef(new Animated.Value(0)).current;
  const circleRef: Ref<any> = useRef(null);

  const animationRef: Ref<Animated.CompositeAnimation | null> = useRef(null);
  const currentProgress = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      const remainingTime = initialTime * (1 - currentProgress.current);

      (animationRef as any).current = Animated.timing(progress, {
        toValue: 1,
        duration: remainingTime * 1000,
        useNativeDriver: true,
      });

      animationRef.current?.start();
    }
  }, [isPlaying, initialTime, progress]);

  useEffect(() => {
    if (!isPlaying && animationRef.current) {
      animationRef.current.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!hasStarted) {
      progress.setValue(0);
      currentProgress.current = 0;

      if (circleRef.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset: circumference,
        });
      }
    }
  }, [hasStarted, circumference, progress]);

  useEffect(() => {
    const listener = progress.addListener((value) => {
      currentProgress.current = value.value;

      const strokeDashoffset = circumference * (1 - value.value);

      if (circleRef.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progress.removeListener(listener);
    };
  }, [circumference, progress]);

  return {
    state: {
      progress,
      circleRef,
      animationRef,
      currentProgress,
    },
    actions: {},
  };
}
