import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../Components/background";
import { colors } from "../../../Shared/Theme";
import Settings from "../Components/Modal/settingsModal";
import { useHome } from "../Hooks";
import {
  FinishModal,
  FlowModal,
  Tag,
  ActionButton,
  SettingsButton,
} from "../Components";

export default function HomeScreen() {
  const { state, actions } = useHome();
  const {
    width,
    ratio,
    showSettings,
    showModal,
    showFinishedModal,
    customState,
    flow,
    isPlaying,
    hasStarted,
    time,
  } = state;
  const {
    setSettingsVisible,
    cancelModal,
    nextModal,
    finishModal,
    resetModal,
    customStateHook,
    playClick,
    pauseClick,
    resetClick,
  } = actions;

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
              {time()}
            </Text>
          </View>

          <View style={[styles.actionsButtonsContainer, { width: width }]}>
            <ActionButton
              active={hasStarted || isPlaying}
              color={customState.primaryColor}
              icon="refresh"
              onPress={resetClick}
            />
            <ActionButton
              color={customState.primaryColor}
              active={!isPlaying}
              icon="play"
              onPress={playClick}
            />
            <ActionButton
              active={isPlaying}
              color={customState.primaryColor}
              icon="pause"
              onPress={pauseClick}
            />
          </View>
        </View>

        <SettingsButton onPress={() => setSettingsVisible()} />

        <Settings
          visible={showSettings}
          customStateHook={{
            state: customState,
            actions: customStateHook,
          }}
          color={customState.primaryColor}
          onClose={setSettingsVisible}
        />

        <FlowModal
          visible={showModal}
          flow={flow}
          color={customState.primaryColor}
          onNext={nextModal}
          onCancel={cancelModal}
        />

        <FinishModal
          visible={showFinishedModal}
          color={customState.primaryColor}
          onReset={resetModal}
          onFinish={finishModal}
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
    fontFamily: "Roboto-Medium",
  },
  actionsButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 48,
  },
});
