import { Vibration } from "react-native";
import { UPDATE_MODAL_VISIBLE } from "../Constants/Reducer";
import { modalTypes } from "../types";

const INITIAL_STATE: modalTypes.modalProps = {
  modalVisible: false,
};

const modalReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_MODAL_VISIBLE:
      const pattern = [400, 200, 200];
      const repeat = true;

      action.payload.value ? Vibration.vibrate(pattern, repeat) : Vibration.cancel();

      return {
        ...state,
        modalVisible: action.payload.value,
      };
    default:
      return state;
  }
};

export default modalReducer;
