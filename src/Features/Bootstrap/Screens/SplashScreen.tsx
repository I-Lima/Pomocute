import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../../Shared/Theme";
import { useBootstrap } from "../Hooks/useBootstrap";

export default function SplashScreen() {
  const { state } = useBootstrap();
  const { width } = state;

  return (
    <View style={styles.container}>
      {/* <Image source={LOGO} /> */}

      <View style={{ marginTop: width / 3 }}>
        <ActivityIndicator size={60} color={colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});
