import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
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
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { state, actions } = useHome();
  const { t } = useTranslation();

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
    timeLeft,
    initialTime,
    radius,
    strokeWidth,
    circumference,
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

  const progress =
    initialTime > 0
      ? Math.min(Math.max((initialTime - timeLeft) / initialTime, 0), 1)
      : 0;
  const strokeDashoffset = circumference * (1 - progress);

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
          <Tag type={flow} color={customState.primaryColor} t={t} />

          <View
            style={[styles.animationContainer, { width: ratio, height: ratio }]}
          >
            <Svg width={ratio} height={ratio}>
              <Circle
                stroke={
                  isPlaying || hasStarted
                    ? flow === "focus"
                      ? `${colors.white + "33"}`
                      : `${customState.primaryColor + "33"}`
                    : "transparent"
                }
                fill="none"
                cx={ratio / 2}
                cy={ratio / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />

              <Circle
                stroke={
                  flow === "focus" ? colors.white : customState.primaryColor
                }
                fill="none"
                cx={ratio / 2}
                cy={ratio / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${ratio / 2}, ${ratio / 2}`}
              />
            </Svg>

            <View style={StyleSheet.absoluteFillObject}>
              <View
                style={[
                  styles.timerContainer,
                  !isPlaying &&
                    !hasStarted && [
                      styles.timerContainerBorder,
                      {
                        borderColor:
                          flow === "focus"
                            ? colors.white
                            : customState.primaryColor,
                      },
                    ],
                ]}
              >
                <Text
                  style={[
                    styles.timerText,
                    {
                      color:
                        flow === "focus"
                          ? colors.white
                          : customState.primaryColor,
                    },
                  ]}
                >
                  {time()}
                </Text>
              </View>
            </View>
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
          t={t}
        />

        <FlowModal
          visible={showModal}
          flow={flow}
          color={customState.primaryColor}
          onNext={nextModal}
          onCancel={cancelModal}
          t={t}
        />

        <FinishModal
          visible={showFinishedModal}
          color={customState.primaryColor}
          onReset={resetModal}
          onFinish={finishModal}
          t={t}
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
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainerBorder: {
    borderRadius: 200,
    borderWidth: 10,
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
