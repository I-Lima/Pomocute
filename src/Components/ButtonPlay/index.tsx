import React, { useImperativeHandle, useState, Ref } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../Constants/Styles";
import { ButtonPlayTypes, HomeTypes } from "../../types";
import { useSelector } from "react-redux";

const ButtonPlay = React.forwardRef((props: ButtonPlayTypes.ButtonPlayProps, ref: Ref<ButtonPlayTypes.ButtonPlayRef>) => {
  const { color, onPressPause, onPressPlay } = props;
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const colorButton = color === "yellow" ? colorState.currentColor.color : Colors.WHITE;
  const colorIcon = color === "yellow" ? Colors.WHITE : colorState.currentColor.color;
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
