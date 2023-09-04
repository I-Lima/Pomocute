import { UPDATE_BIGGER_REST_TIMER, UPDATE_FOCUS_TIMER, UPDATE_REST_TIMER } from "../Constants/Reducer"

const INITIAL_STATE = {
  focusTimer: 25,
  restTimer: 5,
  biggerRestTimer: 10,
}

const timerReducer = (state = INITIAL_STATE, action: any) => {
  switch(action.type){
    case UPDATE_FOCUS_TIMER:
      return {
        ...state,
        focusTimer: action.payload.value
      };
    case UPDATE_REST_TIMER:
      return {
        ...state,
        restTimer: action.payload.value
      };
    case UPDATE_BIGGER_REST_TIMER:
      return {
        ...state,
        biggerRestTimer: action.payload.value
      }
    default:
      return state;
  }
}

export default timerReducer;
