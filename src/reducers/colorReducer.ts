/* eslint-disable no-case-declarations */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHANGE_COLOR } from "../Constants/Reducer";
import { Colors } from "../Constants/Styles";
import { ColorTypes } from "../types";

const INITIAL_STATE = {
  color: "y",
  currentColor: {
    background: Colors.BACKGROUND_YELLOW,
    color: Colors.YELLOW,
  },
};

const ChangeCurrentColor = (color: ColorTypes.colorTypes) => {
  switch (color) {
    case "y":
      return {
        background: Colors.BACKGROUND_YELLOW,
        color: Colors.YELLOW,
      };
    case "g":
      return {
        background: Colors.BACKGROUND_GREEN,
        color: Colors.GREEN,
      };
    case "p":
      return {
        background: Colors.BACKGROUND_PINK,
        color: Colors.PINK,
      };
    case "b":
      return {
        background: Colors.BACKGROUND_BLUE,
        color: Colors.BLUE,
      };
    default:
      break;
  }
};

export const saveColorStateToAsyncStorage = async (value: {
  color: any;
  currentColor: { background: string; color: string } | undefined;
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("colorState", jsonValue);
  } catch (error) {}
};

export const loadColorStateFromAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("colorState");
    return jsonValue != null ? JSON.parse(jsonValue) : INITIAL_STATE;
  } catch (error) {
    return INITIAL_STATE;
  }
};

const colorReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CHANGE_COLOR:
      const palette = ChangeCurrentColor(action.payload.value);
      const UpdatedState = {
        ...state,
        color: action.payload.value,
        currentColor: palette,
      };

      saveColorStateToAsyncStorage(UpdatedState);
      return UpdatedState;
    default:
      return state;
  }
};

export default colorReducer;
