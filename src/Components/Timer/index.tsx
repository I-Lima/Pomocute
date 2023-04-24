import React from "react";
import { View, Text } from "react-native";
import { Colors, Dimension, Fonts } from "../../Constants/Styles";

 interface PropsTimer {
  time: Function;
  color: 'yellow' | 'white';
 }

function Timer({time, color}: PropsTimer) {
  const colorBackground = color === 'yellow' ? Colors.YELLOW : Colors.WHITE;
  const colorNumbers = color === 'yellow' ? Colors.WHITE : Colors.YELLOW;

  return (
    <View style={{
      width: Dimension.WIDTH / 1.4,
      height: Dimension.WIDTH / 1.4,
      backgroundColor: colorBackground,
      borderColor: Colors.BLACK,
      borderWidth: 0.8,
      borderRadius: Dimension.WIDTH / 1.4,
      alignItems: "center",
      justifyContent: "center",
  }}>
    <Text style={[
        Fonts.COMFORTAA_BOLD,
        {
          color: colorNumbers,
          borderColor: Colors.BLACK,
          textShadowColor: Colors.BLACK,
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 0.5,
          fontSize: Dimension.WIDTH / 6,
        },
    ]}>
      {time()}
    </Text>
  </View>
  );
}

export default Timer;
