import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UPDATE_BIGGER_REST_TIMER,
  UPDATE_FOCUS_TIMER,
  UPDATE_REST_TIMER,
  UPDATE_TIMER_STATE,
} from "../Constants/Reducer";
import { TimerTypes } from "../types";

const INITIAL_STATE: TimerTypes.timerStateProps = {
  focusTimer: 1500,
  restTimer: 300,
  biggerRestTimer: 600,
  inFocus: true,
};

export const saveTimerStateToAsyncStorage = async (
  value: TimerTypes.asyncTimerTypes
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("timerState", jsonValue);
  } catch (error) {}
};

export const loadTimerStateFromAsyncStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("timerState");
    return jsonValue != null ? JSON.parse(jsonValue) : INITIAL_STATE;
  } catch (error) {
    return INITIAL_STATE;
  }
};

const timerReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: { value: any } }
) => {
  switch (action.type) {
    case UPDATE_FOCUS_TIMER: {
      const updateStateFocus = {
        ...state,
        focusTimer: action.payload.value,
      };

      saveTimerStateToAsyncStorage(updateStateFocus);
      return updateStateFocus;
    }
    case UPDATE_REST_TIMER: {
      const updateStateRest = {
        ...state,
        restTimer: action.payload.value,
      };

      saveTimerStateToAsyncStorage(updateStateRest);
      return updateStateRest;
    }
    case UPDATE_BIGGER_REST_TIMER: {
      const updateStateBRest = {
        ...state,
        biggerRestTimer: action.payload.value,
      };

      saveTimerStateToAsyncStorage(updateStateBRest);
      return updateStateBRest;
    }
    case UPDATE_TIMER_STATE: {
      return {
        ...state,
        inFocus: action.payload.value,
      };
    }
    default:
      return state;
  }
};

export default timerReducer;
