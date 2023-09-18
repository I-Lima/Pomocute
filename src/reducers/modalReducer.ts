import { UPDATE_MODAL_VISIBLE } from "../Constants/Reducer";
import { modalTypes } from "../types";

const INITIAL_STATE: modalTypes.modalProps = {
  modalVisible: false,
};

const modalReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATE_MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.payload.value,
      };
    default:
      return state;
  }
};

export default modalReducer;
