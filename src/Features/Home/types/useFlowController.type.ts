import { SaveCustomStateParams } from "src/Shared/Hooks/types";

export type UseFlowControllerParams = {
  customState: SaveCustomStateParams;
  onFinishTimer: () => void;
  onFinishStep: () => void;
};
