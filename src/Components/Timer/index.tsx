import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View } from "react-native";
import { Dimension } from "../../Constants/Styles";
import { Path, Svg } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface PropsTimer {
  receivedTimer: number;
}

const Timer = forwardRef((props: PropsTimer, ref) => {
  const [timer, setTimer] = useState(
    `${
      props.receivedTimer < 10 ? "0" + props.receivedTimer : props.receivedTimer
    }:00`
  );

  const heightWave = useSharedValue(100);
  const waveAnimated = useSharedValue(5);

  const waveProps = useAnimatedProps(() => {
    return {
      d: `
        M 0 0
        Q 10 ${heightWave} 70 0
        T 200 0
        T 310 0
        T 400 0
        T 940 0
        V ${heightWave}
        H 0
        Z
      `,
    };
  });

  useImperativeHandle(ref, () => ({
    controllerTimer() {
      let minutes = props.receivedTimer;
      let seconds = 0;

      let intervalId = setInterval(() => {
        if (minutes === 0 && seconds - 1 <= 0) {
          clearInterval(intervalId);
        }

        if (seconds <= 0 && minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }

        setTimer(
          `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        );
      }, 1000);
    },
  }));

  return (
    <View style={{ backgroundColor: "red" }}>
      {/* <View
        style={{
          width: Dimension.WIDTH / 1.4,
          height: Dimension.WIDTH / 1.4,
          backgroundColor: Colors.BACKGROUND_YELLOW,
          borderColor: Colors.BLACK,
          borderWidth: 0.8,
          borderRadius: Dimension.WIDTH / 1.4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            Fonts.COMFORTAA_BOLD,
            {
              color: Colors.WHITE,
              borderColor: Colors.BLACK,
              textShadowColor: Colors.BLACK,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 0.5,
              fontSize: Dimension.WIDTH / 6,
            },
          ]}
        >
          {timer}
        </Text>
      </View> */}

      <Svg
        width={Dimension.WIDTH}
        height={Dimension.HEIGHT}
        viewBox={`0 0 ${Dimension.WIDTH} 100`}
      >
        <AnimatedPath
          animatedProps={waveProps}
          fill="#0099ff"
          transform="translate(0, 10)"
        />
      </Svg>
    </View>
  );
});

export default Timer;
