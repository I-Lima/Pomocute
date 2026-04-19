import React from "react";
import { StyleSheet, View } from "react-native";
import { BackgroundProps } from "../Types";

export default function Background(props: Readonly<BackgroundProps>) {
  const { children, backgroundColor, circlesColor } = props;

  return (
    <View
      style={[styles.container, { backgroundColor: `${backgroundColor}EE` }]}
    >
      <View style={[styles.circle1, { backgroundColor: circlesColor }]} />
      <View style={[styles.circle2, { backgroundColor: circlesColor }]} />
      <View style={[styles.circle3, { backgroundColor: circlesColor }]} />

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  circle1: {
    width: 240,
    height: 240,
    position: "absolute",
    top: -80,
    right: -40,
    borderRadius: 150,
  },
  circle2: {
    width: 190,
    height: 190,
    position: "absolute",
    bottom: 200,
    right: -10,
    borderRadius: 200,
  },
  circle3: {
    width: 400,
    height: 400,
    position: "absolute",
    bottom: -160,
    left: -140,
    borderRadius: 200,
  },
});
