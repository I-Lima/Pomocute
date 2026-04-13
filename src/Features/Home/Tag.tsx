import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ITag } from "./types";

export default function Tag({ type }: Readonly<ITag>) {
  const renderFocus = (
    <>
      <Icon name="bullseye" size={28} color="white" style={styles.icon} />
      <Text style={styles.text}>FOCUS</Text>
    </>
  );

  const renderBreak = (
    <>
      <Icon name="coffee" size={28} color="white" style={styles.icon} />
      <Text style={styles.text}>BREAK</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {type === "focus" ? renderFocus : renderBreak}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#EF4444",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  icon: { marginRight: 8 },
  text: {
    color: "white",
    fontSize: 28,
  },
});
