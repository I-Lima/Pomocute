import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { colors } from "../../../Shared/Theme";
import { useBootstrap } from "../Hooks/useBootstrap";

export default function SplashScreen() {
  const { width } = useWindowDimensions();
  const { state } = useBootstrap();

  if (!state.primaryColor) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: state.primaryColor,
        },
      ]}
    >
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
