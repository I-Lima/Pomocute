import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { IActionButtonProps } from "./types";

export default function ActionButton(props: Readonly<IActionButtonProps>) {
  const { active, icon, onPress } = props;

  const activeButtonStyle = {
    backgroundColor: "#EF4444",
    elevation: 4,
    width: 100,
    height: 100,
  };

  const inactiveButtonStyle = {
    backgroundColor: "white",
    elevation: 1,
    width: 78,
    height: 78,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        active ? activeButtonStyle : inactiveButtonStyle,
      ]}
      onPress={onPress}
      disabled={!active}
    >
      <Icon
        name={icon}
        size={active ? 48 : 28}
        color={active ? "white" : "#90A1B9"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
  },
});
