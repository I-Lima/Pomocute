import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../../Shared/Components/background";
import SettingsButton from "./Components/settingsButton";
import ActionButton from "./Components/actionButton";
import Tag from "./Components/Tag";
import { colors } from "../../Shared/Theme";
import Settings from "../Settings";
import useCustomStates from "../../Shared/Hooks/useCustomStates";
import useHome from "./Hooks/useHome";
import { useTimer } from "./Hooks/useTimer";

export default function HomeScreen() {
  const { state, actions } = useHome();
  const { width, ratio, showSettings, flow, isPlaying, hasStarted } = state;
  const {
    settingsButtonClick,
    setSettingsVisible,
    changeFlow,
    changeIsPlaying,
    changeHasStarted,
  } = actions;
  const customStateHook = useCustomStates();
  const { state: customState } = customStateHook;
  const { state: timerState, actions: timerActions } = useTimer({
    initialValue: flow
      ? Number(customState.focusDuration) * 60
      : Number(customState.breakDuration) * 60,
    isPlayingCallback: changeIsPlaying,
    hasStartedCallback: changeHasStarted,
    changeFlowCallback: changeFlow,
  });

  return (
    <Background
      backgroundColor={
        flow === "focus" ? customState.primaryColor : colors.bgPrimary
      }
      circlesColor={
        flow === "focus" ? colors.bgPrimary : customState.primaryColor + "33"
      }
    >
      <View style={styles.container}>
        <View style={[styles.content, { padding: width / 5 }]}>
          <Tag type={flow} color={customState.primaryColor} />
          <View
            style={[
              styles.timerContainer,
              {
                width: ratio,
                height: ratio,
                borderColor:
                  flow === "focus" ? colors.white : customState.primaryColor,
              },
            ]}
          >
            <Text
              style={[
                styles.timerText,
                {
                  color:
                    flow === "focus" ? colors.white : customState.primaryColor,
                },
              ]}
            >
              {timerState.formattedTime()}
            </Text>
          </View>

          <View style={[styles.actionsButtonsContainer, { width: width }]}>
            <ActionButton
              active={hasStarted}
              color={customState.primaryColor}
              icon="refresh"
              onPress={timerActions.resetTimer}
            />
            <ActionButton
              color={customState.primaryColor}
              active={!isPlaying}
              icon="play"
              onPress={timerActions.startTimer}
            />
            <ActionButton
              active={isPlaying}
              color={customState.primaryColor}
              icon="pause"
              onPress={timerActions.pauseTimer}
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
