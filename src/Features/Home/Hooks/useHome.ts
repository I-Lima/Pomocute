import { useCallback, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { INITIAL_STATE, useFlowController } from "./index";
import { UserSettingsContext } from "../../../Contexts";

export function useHome() {
  const { state: customState, actions: customStateHook } = useContext(
    UserSettingsContext
  ) ?? { state: INITIAL_STATE, actions: {} };

  const { width } = Dimensions.get("screen");
  const ratio = width * 0.8;

  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  const onFinishTimer = () => setShowModalVisible(true);
  const onFinishStep = () => setShowFinishedModalVisible(true);

  const { state: flowState, actions: flowActions } = useFlowController({
    customState,
    onFinishTimer,
    onFinishStep,
  });
  const { flow, isPlaying, hasStarted, time } = flowState;

  const setShowModalVisible = (visible?: boolean) => {
    if (visible) {
      setShowModal(visible);
      return;
    }
    setShowModal(!showModal);
  };
  const setSettingsVisible = (visible?: boolean) => {
    if (visible !== undefined) {
      setShowSettings(visible);
      return;
    }
    setSettingsVisible(!showSettings);
  };

  const setShowFinishedModalVisible = (visible?: boolean) => {
    if (visible) {
      setShowFinishedModal(visible);
      return;
    }
    setShowFinishedModal(!showFinishedModal);
  };

  const playClick = useCallback(() => {
    flowActions.playClick();
  }, [flowActions]);

  const pauseClick = useCallback(() => {
    flowActions.pauseClick();
  }, [flowActions]);

  const resetClick = useCallback(() => {
    flowActions.resetClick();
  }, [flowActions]);

  const cancelModal = () => {
    flowActions.changeFlow("focus");
    flowActions.resetClick();
    setShowModalVisible();
  };
  const nextModal = () => {
    flowActions.changeFlow();
    flowActions.resetClick();
    flowActions.playClick(true);
    setShowModalVisible();
  };

  const finishModal = () => {
    flowActions.changeFlow("focus");
    flowActions.resetClick();
    setShowFinishedModalVisible();
  };
  const resetModal = () => {
    flowActions.changeFlow();
    flowActions.resetClick(true);
    flowActions.playClick(true);
    setShowFinishedModalVisible();
  };

  return {
    state: {
      width,
      ratio,
      showModal,
      showSettings,
      showFinishedModal,
      customState,
      flow,
      isPlaying,
      hasStarted,
      time,
    },
    actions: {
      setSettingsVisible,
      cancelModal,
      nextModal,
      finishModal,
      resetModal,
      customStateHook,
      playClick,
      pauseClick,
      resetClick,
    },
  };
}
