import { UPDATE_MODAL_VISIBLE } from "../Constants/Reducer";

export const ChangeModalVisible = (value: boolean) => ({
  type: UPDATE_MODAL_VISIBLE,
  payload: { value },
});
