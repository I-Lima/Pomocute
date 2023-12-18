import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../Constants/Styles";
import { ButtonPlayTypes, HomeTypes } from "../../types";
import { useSelector } from "react-redux";

const ButtonPlay = (props: ButtonPlayTypes.ButtonPlayProps) => {
  const { onPressPause, onPressPlay, isPlay } = props;
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const timerState = useSelector((state: HomeTypes.StateType) => state.timer);
  const colorButton = timerState.inFocus
    ? Colors.WHITE
    : colorState.currentColor.color;
  const colorIcon = timerState.inFocus
    ? colorState.currentColor.color
    : Colors.WHITE;

  const handlePress = () => (isPlay ? onPressPlay() : onPressPause());

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.buttonContainer, { backgroundColor: colorButton }]}
    >
      {isPlay ? (
        <Icon name="play" size={56} color={colorIcon} />
      ) : (
        <Icon name="pause" size={70} color={colorIcon} />
      )}
    </TouchableOpacity>
  );
};

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
