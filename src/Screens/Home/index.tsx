import React, { useEffect, useState } from "react";
import { useTimer } from "../../Utils/Time";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Dimension, Fonts } from "../../Constants/Styles";
import ButtonPlay from "../../Components/ButtonPlay";
import Timer from "../../Components/Timer";
import ButtonRefresh from "../../Components/ButtonRefresh";
import EditButton from "../../Components/EditButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { HomeTypes } from "../../types";
import { useNavigation } from "@react-navigation/native";
import ModalComponent from "../../Components/Modal";
import { ChangeModalVisible } from "../../actions/modalActions";
import { changeInFocus, clearCyclesCount, updateCyclesCount } from "../../actions/timerActions";
import { ContentFinalCycle } from "./Components/ContentFinalCycle";
import { ChildrenModal } from "./Components/ChildrenModal";

function Home() {
  const timerState = useSelector((state: HomeTypes.StateType) => state.timer);
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(timerState.focusTimer);
  const {
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    incrementTime,
    decrementTime,
  } = useTimer(timer);
  const [isRunning, setIsRunning] = useState(false);
  const [type, setType] = useState("");
  const [buttonIsPlay, setButtonIsPlay] = useState(true);

  const widthHome = isRunning ? { width: Dimension.WIDTH - 50 } : null;
  const navigation = useNavigation();
  const backgroundColor = timerState.inFocus
    ? colorState.currentColor.background
    : Colors.BACKGROUND_WHITE;
  const color = timerState.inFocus
    ? Colors.WHITE
    : colorState.currentColor.color;

  useEffect(() => {
    let valueRest: number;

    if(timerState.cyclesCount >= 3) {
      valueRest = timerState.biggerRestTimer;
    } else {
      valueRest = timerState.restTimer;
    }

    setTimer(() => {
      return timerState.inFocus ? timerState.focusTimer : valueRest;
    });
  }, [timerState]);

  const handlePlay = () => {
    setIsRunning(true);
    startTimer();
    setType("start");
    setButtonIsPlay(false);
  };

  const handlePause = () => {
    pauseTimer();
    setButtonIsPlay(true);
  };

  const handleRefresh = (arg: boolean) => {
    resetTimer();

    if(arg) setButtonIsPlay(true);

    dispatch(clearCyclesCount());
    dispatch(changeInFocus(true));
    setIsRunning(false);
    setType("restart");
  };

  const handleCancelClick = () => {
    handleRefresh(true);
    dispatch(ChangeModalVisible(false));
    dispatch(changeInFocus(true));
  };


  const nextClickCycles = () => {
    dispatch(ChangeModalVisible(false));
    dispatch(clearCyclesCount());
    dispatch(changeInFocus(!timerState.inFocus));
    // handlePlay();
  }

  const handleNextClick = () => {
    dispatch(ChangeModalVisible(false));
    dispatch(changeInFocus(!timerState.inFocus));

    if(timerState.inFocus) dispatch(updateCyclesCount());

    if(timerState.cyclesCount < 0) handlePlay();
  };

  // TO DO: Create counter before start.
  // TO DO: adapt component to restart after timeout.
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() =>  navigation.navigate("Config")}
      >
        <Icon name="settings" size={Dimension.WIDTH / 10} color={color} />
      </TouchableOpacity>

      {/* { timerState.cyclesCount >=1 ? (
        <View style={{ flex: 5, alignItems: "center", justifyContent: "flex-start"}}>
          <ContentFinalCycle
            cancelPress={handleRefresh}
            nextPress={nextClickCycles}
            backgroundColor={backgroundColor}
            color={color}
          />
        </View>
      ) : ( */}
          <View style={styles.content}>
            <View style={{ flex: 0.16,}} >
              {timerState.inFocus ? null : (
                <Text style={[Fonts.COMFORTAA_BOLD ,{
                  fontSize: 48,
                  color: color,
                  borderColor: Colors.BLACK,
                  textShadowColor: Colors.BLACK,
                  textShadowOffset: { width: 1.5, height: 1.5 },
                  textShadowRadius: 1}]}>
                  Descanso
                </Text>
              )}
            </View>

            <View style={styles.timerComponent}>
              <Timer time={formattedTime} functionality={type} />
            </View>

            <View style={[styles.actionsButtons, widthHome]}>
              <ButtonPlay
                onPressPlay={handlePlay}
                onPressPause={handlePause}
                isPlay={buttonIsPlay}
              />

              {isRunning && (
                <ButtonRefresh onPressRefresh={() => handleRefresh(true)} />
              )}
            </View>
          </View>

          <EditButton onPressAdd={incrementTime} onPressRemove={decrementTime} />
      {/* )} */}

      <ModalComponent
        children={
          <ChildrenModal
            inFocus={timerState.inFocus}
            backgroundColor={colorState.currentColor.background}
            handleCancelClick={handleCancelClick}
            handleNextClick={handleNextClick}
          />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconButton: {
    flex: 0.8,
    alignSelf: "flex-start",
    margin: 8,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 10,
  },
  timerComponent: {
    flex: 0.50,
  },
  actionsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.3,
  },
});

export default Home;
