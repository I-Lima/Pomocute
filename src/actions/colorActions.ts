import { CHANGE_COLOR } from "../Constants/Reducer";
import { ColorActionsTypes } from "../types";

export const ChangeColor: ColorActionsTypes.ChangeColorType = (value) => ({
  type: CHANGE_COLOR,
  payload: { value },
});
