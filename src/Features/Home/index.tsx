import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Background from "../../Shared/Components/background";
import SettingsButton from "./Components/settingsButton";
import ActionButton from "./Components/actionButton";
import Tag from "./Components/Tag";
import { colors } from "../../Shared/Theme";

export default function HomeScreen() {
  const { width } = Dimensions.get("screen");
  const ratio = width * 0.8;

  const playButtonClick = () => {};
  const pauseButtonClick = () => {};
  const resetButtonClick = () => {};
  const settingsButtonClick = () => {};

  return (
    <Background
      backgroundColor={colors.primary}
      circlesColor={colors.bgPrimary}
    >
      <View style={styles.container}>
        <View style={[styles.content, { padding: width / 5 }]}>
          <Tag type="focus" />
          <View
            style={[
              styles.timerContainer,
              { width: ratio, height: ratio, borderColor: colors.white },
            ]}
          >
            <Text style={styles.timerText}>25:00</Text>
          </View>

          <View style={[styles.actionsButtonsContainer, { width: width }]}>
            <ActionButton icon="refresh" onPress={resetButtonClick} />
            <ActionButton active icon="play" onPress={playButtonClick} />
            <ActionButton icon="pause" onPress={pauseButtonClick} />
          </View>
        </View>

        <SettingsButton onPress={settingsButtonClick} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerContainer: {
    display: "flex",
    borderWidth: 10,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: "white",
    fontSize: 64,
    fontWeight: "bold",
  },
  actionsButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 48,
  },
});
