import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import colorReducer from "./colorReducer";
import modalReducer from "./modalReducer";

const appReducer = combineReducers({
  timer: timerReducer,
  color: colorReducer,
  modal: modalReducer
});

export default appReducer;
