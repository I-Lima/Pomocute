import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { IActionButtonProps } from "./types";
import { colors } from "src/Shared/Theme";

export default function ActionButton(props: Readonly<IActionButtonProps>) {
  const { active, icon, onPress } = props;

  const activeButtonStyle = {
    backgroundColor: colors.primary,
    elevation: 4,
    width: 100,
    height: 100,
  };

  const inactiveButtonStyle = {
    backgroundColor: colors.white,
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
        color={active ? colors.white : colors.disabled}
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
