import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ISettingsButtonProps } from "./types";

export default function SettingsButton({
  onPress,
}: Readonly<ISettingsButtonProps>) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="settings-outline" size={28} color="#45556C" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
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
