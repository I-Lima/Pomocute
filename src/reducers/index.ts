import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import colorReducer from "./colorReducer";

const appReducer = combineReducers({
  timer: timerReducer,
  color: colorReducer
});

export default appReducer;
