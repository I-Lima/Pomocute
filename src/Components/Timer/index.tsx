import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Dimension, Fonts } from "../../Constants/Styles";
import { Path, Svg } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { HomeTypes, TimerComponentTypes } from "../../types";
import { useSelector } from "react-redux";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// TO DO: Add the timer value on reducer;
function Timer({ time, functionality }: TimerComponentTypes.PropsTimer) {
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const timerState = useSelector((state: HomeTypes.StateType) => state.timer);

  const colorBackgroundCircle = timerState.inFocus
      ? Colors.WHITE
      : colorState.currentColor.color,
    colorBackground = timerState.inFocus
      ? colorState.currentColor.background
      : Colors.BACKGROUND_WHITE,
    colorNumbers = timerState.inFocus
      ? colorState.currentColor.color
      : Colors.WHITE,
    heightAnimatedTotal = Dimension.WIDTH / 1.4,
    heightAnimated = useSharedValue(heightAnimatedTotal + 25),
    waveAnimated = useSharedValue(5),
    timer = 8, // Seconds
    circleDiameter = heightAnimatedTotal * 2,
    installmentAmount = (circleDiameter + 28) / timer,
    counterAmount = circleDiameter / 3,
    [timerIntervalId, setTimerIntervalId] = useState(0),
    [counter, setCounter] = useState(3),
    [showCounter, setShowCounter] = useState(false);

  const SvgContainerProps = useAnimatedProps(() => {
    return {
      width: Dimension.WIDTH / 1.4,
      height: heightAnimated.value,
      viewBox: `0 0 ${Dimension.WIDTH / 1.4} ${heightAnimated.value}`,
    };
  });

  const waveProps = useAnimatedProps(() => {
    return {
      d: `
      M 0 0
      Q 45 ${waveAnimated.value} 90 0
      T 180 0
      T 270 0
      T 360 0
      T 540 0
      V ${heightAnimated.value}
      H 0
      Z
    `,
    };
  });

  const handleCounter = async () => {
    setShowCounter(true);

    const id = setInterval(() => {
      setCounter((prevValue) => {
        if (prevValue === 1) {
          setShowCounter(false);
          heightAnimated.value = 1;
          handleTime();
          clearInterval(id);
        }

        return prevValue - 1;
      });

      heightAnimated.value = withTiming(heightAnimated.value - counterAmount, {
        duration: 100,
        easing: Easing.linear,
      });
    }, 1000);
  };

  const handleTime = () => {
    const id: number = setInterval(() => {
      if (heightAnimated.value >= circleDiameter) {
        return clearInterval(id);
      }

      heightAnimated.value = withTiming(
        heightAnimated.value + installmentAmount,
        {
          duration: 500,
          easing: Easing.linear,
        }
      );
    }, 1000);

    setTimerIntervalId(id);
  };

  // TO DO: search if better functionality
  useEffect(() => {
    switch (functionality) {
      case "start":
        // HandleCounter();
        // HandleTime();
        break;

      case "pause":
        clearInterval(timerIntervalId);
        break;

      case "restart":
        clearInterval(timerIntervalId);
        // HeightAnimated.value = heightAnimatedTotal+25;
        break;

      default:
        break;
    }
  }, [functionality, timerIntervalId]);

  return (
    <View style={style.container}>
      <View style={[style.containerAnimated, { height: heightAnimatedTotal }]}>
        <AnimatedSvg
          animatedProps={SvgContainerProps}
          width={Dimension.WIDTH / 1.4}
        >
          <AnimatedPath
            animatedProps={waveProps}
            fill={colorBackgroundCircle}
            transform="translate(0,15)"
            strokeWidth={0.8}
            stroke={Colors.BLACK}
            fillOpacity={1}
          />
        </AnimatedSvg>
      </View>

      <Text
        style={[
          Fonts.COMFORTAA_BOLD,
          style.textTime,
          {
            color: colorNumbers,
            fontSize: Dimension.WIDTH / (showCounter ? 4 : 6),
          },
        ]}
      >
        {/* {showCounter ? counter : } */}
        {time()}
      </Text>

      <View style={[style.timerBorder, { borderColor: colorBackground }]} />
      <View style={[style.maskBorder1, { borderColor: colorBackground }]} />
      <View style={[style.maskBorder2]} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  containerAnimated: {
    justifyContent: "flex-end",
  },
  textTime: {
    borderColor: Colors.BLACK,
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.5,
    position: "absolute",
    alignSelf: "center",
  },
  timerBorder: {
    backgroundColor: "transparent",
    height: Dimension.WIDTH * 1.05,
    width: Dimension.WIDTH,
    position: "absolute",
    borderWidth: Dimension.WIDTH / 7,
    borderRadius: Dimension.WIDTH / 2.1,
    alignSelf: "center",
  },
  maskBorder1: {
    backgroundColor: "transparent",
    height: Dimension.WIDTH / 1.26,
    width: Dimension.WIDTH / 1.26,
    position: "absolute",
    borderRadius: Dimension.WIDTH / 1.26,
    borderWidth: Dimension.WIDTH / 23,
    alignSelf: "center",
  },
  maskBorder2: {
    backgroundColor: "transparent",
    height: Dimension.WIDTH / 1.4,
    width: Dimension.WIDTH / 1.4,
    position: "absolute",
    borderRadius: Dimension.WIDTH / 1.4,
    borderColor: Colors.BLACK,
    borderWidth: 0.5,
    alignSelf: "center",
  },
});

export default Timer;
