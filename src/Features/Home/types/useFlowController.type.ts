import { useUserSettingsParams } from "../../../Shared/Types/useUserSettings";
export type UseFlowControllerParams = {
  customState: useUserSettingsParams;
  onFinishTimer: () => void;
  onFinishStep: () => void;
};
