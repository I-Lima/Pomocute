import { SaveCustomStateParams } from "./saveCustomStateParams.type";
export type UseFlowControllerParams = {
  customState: SaveCustomStateParams;
  onFinishTimer: () => void;
  onFinishStep: () => void;
};
