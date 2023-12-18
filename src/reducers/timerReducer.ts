import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLEAR_CYCLES_COUNT,
  UPDATE_BIGGER_REST_TIMER,
  UPDATE_CYCLES_COUNT,
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
  cyclesCount: 0,
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
    case UPDATE_CYCLES_COUNT: {
      if (state.inFocus) {
        return;
      }

      let value = state.cyclesCount + 1;
      if (state.cyclesCount === 5) {
        value = 0;
      }

      return {
        ...state,
        cyclesCount: value,
      };
    }
    case CLEAR_CYCLES_COUNT: {
      return {
        ...state,
        cyclesCount: 0,
      };
    }
    default:
      return state;
  }
};

export default timerReducer;
