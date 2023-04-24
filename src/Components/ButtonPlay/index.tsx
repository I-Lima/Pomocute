import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../Constants/Styles";
interface PropsComponent {
  onPressPlay?: () => void;
  onPressPause?: () => void;
  onPressRefresh?: () => void;
  color: "yellow" | "white";
  type: "play" | "refresh" | "pause";
}

function ButtonPlay(props: PropsComponent) {
  const { color, onPressPause, onPressPlay, onPressRefresh, type } = props;
  const colorButton = color === "yellow" ? Colors.YELLOW : Colors.WHITE;
  const colorIcon = color === "yellow" ? Colors.WHITE : Colors.YELLOW;
  const [buttonType, setButtonType] = useState(type === 'pause' ? 'pause' : 'play');

  const handlePress = () => {
    if (buttonType === "play") {
      setButtonType("pause");

      if(onPressPlay) onPressPlay();
    } else if (buttonType === "pause") {
      setButtonType("play");

      if(onPressPause) onPressPause();
    } else {
      if(onPressRefresh) onPressRefresh();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.buttonContainer, { backgroundColor: colorButton }]}
    >
      {buttonType === "play" && <Icon name="play" size={56} color={colorIcon} />}

      {buttonType === "pause" && <Icon name="pause" size={70} color={colorIcon} />}

      {type === "refresh" && <Icon name="refresh" size={56} color={colorIcon} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 88,
    height: 88,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.BLACK,
    shadowRadius: 50,
    elevation: 5,
  },
});

export default ButtonPlay;
