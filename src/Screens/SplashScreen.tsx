import React from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Colors, Dimension } from "../Constants/Styles";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LOGO = require("../assets/logo.png");

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={LOGO} />

      <View style={{ marginTop: Dimension.WIDTH / 3 }}>
        <ActivityIndicator size={60} color={Colors.WHITE} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND_YELLOW,
  },
});
