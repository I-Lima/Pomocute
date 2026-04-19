export interface ModalFinishParams {
  visible: boolean;
  color: string;
  onFinish: () => void;
  onReset: () => void;
}
