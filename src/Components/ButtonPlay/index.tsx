import React, { useImperativeHandle, useState, Ref } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../Constants/Styles";

interface ButtonPlayProps {
  onPressPlay?: () => void;
  onPressPause?: () => void;
  color: "yellow" | "white";
}

interface ButtonPlayRef {
  changeTypeToPlay: () => void;
}

const ButtonPlay = React.forwardRef((props: ButtonPlayProps, ref: Ref<ButtonPlayRef>) => {
  const { color, onPressPause, onPressPlay } = props;
  const colorButton = color === "yellow" ? Colors.YELLOW : Colors.WHITE;
  const colorIcon = color === "yellow" ? Colors.WHITE : Colors.YELLOW;
  const [buttonType, setButtonType] = useState("play");

  useImperativeHandle(ref, () => ({
    changeTypeToPlay: () => {
      setButtonType("play");
    },
  }));

  const handlePress = () => {
    if (buttonType === "play") {
      setButtonType("pause");

      if (onPressPlay) onPressPlay();
    } else {
      setButtonType("play");

      if (onPressPause) onPressPause();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.buttonContainer, { backgroundColor: colorButton }]}
    >
      {buttonType === "play" && <Icon name="play" size={56} color={colorIcon} />}

      {buttonType === "pause" && <Icon name="pause" size={70} color={colorIcon} />}
    </TouchableOpacity>
  );
});

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
