import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../Constants/Styles";
import { ButtonRefreshTypes, HomeTypes } from "../../types";
import { useSelector } from "react-redux";


function ButtonRefresh(props: ButtonRefreshTypes.PropsComponent) {
  const { color, onPressRefresh } = props;
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const colorButton = color === "yellow" ? colorState.currentColor.color : Colors.WHITE;
  const colorIcon = color === "yellow" ? Colors.WHITE : colorState.currentColor.color;

  return (
    <TouchableOpacity
      onPress={onPressRefresh}
      style={[styles.buttonContainer, { backgroundColor: colorButton }]}
    >
      <Icon name="refresh" size={56} color={colorIcon} />
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

export default ButtonRefresh;
