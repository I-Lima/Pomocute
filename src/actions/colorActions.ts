import { CHANGE_COLOR } from "../Constants/Reducer";

export const ChangeColor = (value: string) => ({
  type: CHANGE_COLOR,
  payload: {value}
});
