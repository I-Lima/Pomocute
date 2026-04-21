import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../Shared/Theme";
import { TagProps } from "../Types";

export function Tag({ type, color, t }: Readonly<TagProps>) {
  const renderFocus = (
    <>
      <Icon
        name="bullseye"
        size={28}
        color={colors.white}
        style={styles.icon}
      />
      <Text style={styles.text}>{t("tag.focus").toUpperCase()} </Text>
    </>
  );

  const renderBreak = (
    <>
      <Icon name="coffee" size={28} color={colors.white} style={styles.icon} />
      <Text style={styles.text}>{t("tag.break").toUpperCase()}</Text>
    </>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color, borderColor: colors.white },
      ]}
    >
      <View style={styles.content}>
        {type === "focus" ? renderFocus : renderBreak}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
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
    fontFamily: "Roboto-Medium",
  },
});
