import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../Shared/Theme";
import { SettingsButtonProps } from "../../Types";

export function SettingsButton({ onPress }: Readonly<SettingsButtonProps>) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.white }]}
      onPress={onPress}
    >
      <Icon name="settings-outline" size={28} color={colors.disabled} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    position: "absolute",
    top: 16,
    right: 16,
    elevation: 2,
  },
});
