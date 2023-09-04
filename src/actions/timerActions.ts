import { UPDATE_BIGGER_REST_TIMER, UPDATE_FOCUS_TIMER, UPDATE_REST_TIMER } from "../Constants/Reducer";

 export const changeFocusTimer = (value: string) => ({
  type: UPDATE_FOCUS_TIMER,
  payload: {value: Number(value)*60}
 });

 export const changeRestTimer = (value: string) => ({
  type: UPDATE_REST_TIMER,
  payload: {value: Number(value)*60}
 });

 export const changeBiggerRestTimer = (value: string) => ({
  type: UPDATE_BIGGER_REST_TIMER,
  payload: {value: Number(value)*60}
 });
