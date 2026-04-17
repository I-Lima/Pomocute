import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Background from "../../Shared/Components/background";
import SettingsButton from "./Components/settingsButton";
import ActionButton from "./Components/actionButton";
import Tag from "./Components/Tag";
import { colors } from "../../Shared/Theme";
import Settings from "../Settings";
import CustomStatesHook from "../../Shared/Hooks/customStates";

export default function HomeScreen() {
  const customStateHook = CustomStatesHook();
  const { state } = customStateHook;

  const { width } = Dimensions.get("screen");
  const ratio = width * 0.8;

  const [showSettings, setShowSettings] = useState(false);

  const playButtonClick = () => {};
  const pauseButtonClick = () => {};
  const resetButtonClick = () => {};
  const settingsButtonClick = () => setShowSettings(!showSettings);
  const setSettingsVisible = (visible: boolean) => setShowSettings(visible);

  return (
    <Background
      backgroundColor={state.primaryColor}
      circlesColor={colors.bgPrimary}
    >
      <View style={styles.container}>
        <View style={[styles.content, { padding: width / 5 }]}>
          <Tag type="focus" color={state.primaryColor} />
          <View
            style={[
              styles.timerContainer,
              { width: ratio, height: ratio, borderColor: colors.white },
            ]}
          >
            <Text style={styles.timerText}>{state.focusDuration}:00</Text>
          </View>

          <View style={[styles.actionsButtonsContainer, { width: width }]}>
            <ActionButton
              color={state.primaryColor}
              icon="refresh"
              onPress={resetButtonClick}
            />
            <ActionButton
              color={state.primaryColor}
              active
              icon="play"
              onPress={playButtonClick}
            />
            <ActionButton
              color={state.primaryColor}
              icon="pause"
              onPress={pauseButtonClick}
            />
          </View>
        </View>

        <SettingsButton onPress={settingsButtonClick} />

        <Settings
          visible={showSettings}
          onClose={() => setSettingsVisible(false)}
          customStateHook={customStateHook}
        />
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
