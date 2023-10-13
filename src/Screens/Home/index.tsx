import React, { useEffect, useRef, useState } from "react";
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
import { changeInFocus } from "../../actions/timerActions";

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

  const widthHome = isRunning ? { width: Dimension.WIDTH - 50 } : null;
  const buttonPlayRef = useRef<HomeTypes.ButtonPlayRef>(null);
  const navigation = useNavigation();
  const backgroundColor = timerState.inFocus
    ? colorState.currentColor.background
    : Colors.BACKGROUND_WHITE;
  const color = timerState.inFocus
    ? Colors.WHITE
    : colorState.currentColor.color;

  useEffect(() => {
    setTimer(() => {
      return timerState.inFocus ? timerState.focusTimer : timerState.restTimer;
    });
  }, [timerState]);

  const handlePlay = () => {
    setIsRunning(true);
    startTimer();
    setType("start");
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleRefresh = (arg: boolean) => {
    resetTimer();

    if (buttonPlayRef.current && arg) {
      buttonPlayRef.current.changeTypeToPlay();
    }

    setIsRunning(false);
    setType("restart");
  };

  const handleCancelClick = () => {
    handleRefresh(true);
    dispatch(ChangeModalVisible(false));
    dispatch(changeInFocus(true));
  };

  const handleNextClick = () => {
    dispatch(ChangeModalVisible(false));
    handleRefresh(false);

    dispatch(changeInFocus(!timerState.inFocus));
    setTimer(timerState.restTimer);
    handlePlay();
  };

  const ChildrenModal = (
    <View style={stylesChildrenModal.container}>
      <Text style={[Fonts.COMFORTAA_BOLD, stylesChildrenModal.title]}>
        {timerState.inFocus ? "Hora da Pausa" : "Hora do retorno"}
      </Text>

      <View style={stylesChildrenModal.contentButtons}>
        <TouchableOpacity onPress={handleCancelClick}>
          <Text
            style={[Fonts.ROBOTO_REGULAR, stylesChildrenModal.cancelButton]}
          >
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            stylesChildrenModal.goButton,
            { backgroundColor: colorState.currentColor.background },
          ]}
          onPress={handleNextClick}
        >
          <Text style={[Fonts.ROBOTO_MEDIUM, stylesChildrenModal.goButtonText]}>
            Seguir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // TO DO: Create counter before start.
  // TO DO: adapt component to restart after timeout.
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() =>  navigation.navigate("Config")} // Navigation.navigate("Config")
      >
        <Icon name="settings" size={Dimension.WIDTH / 10} color={color} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.timerComponent}>
          <Timer time={formattedTime} functionality={type} />
        </View>

        <View style={[styles.actionsButtons, widthHome]}>
          <ButtonPlay
            onPressPlay={handlePlay}
            onPressPause={handlePause}
            ref={buttonPlayRef}
          />

          {isRunning && (
            <ButtonRefresh onPressRefresh={() => handleRefresh(true)} />
          )}
        </View>
      </View>

      <EditButton onPressAdd={incrementTime} onPressRemove={decrementTime} />

      <ModalComponent children={ChildrenModal} />
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
    flex: 0.18,
    alignSelf: "flex-start",
    margin: 8,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.92,
  },
  timerComponent: {
    flex: 0.63,
  },
  actionsButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.38,
  },
});

const stylesChildrenModal = StyleSheet.create({
  container: {
    height: Dimension.HEIGHT / 3.4,
    width: Dimension.WIDTH / 1.2,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.8,
    marginTop: Dimension.HEIGHT / 4,
    elevation: 2,
  },
  title: {
    fontSize: Dimension.WIDTH / 8.5,
    textAlign: "center",
  },
  contentButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-end",
  },
  cancelButton: {
    textDecorationLine: "underline",
    fontSize: Dimension.WIDTH / 24,
  },
  goButton: {
    borderRadius: 5,
    borderColor: Colors.BLACK,
    borderWidth: 0.8,
  },
  goButtonText: {
    fontSize: Dimension.WIDTH / 18,
    marginVertical: 8,
    marginHorizontal: 10,
  },
});

export default Home;
