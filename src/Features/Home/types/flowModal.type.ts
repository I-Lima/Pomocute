export interface ModalFlowProps {
  visible: boolean;
  color: string;
  flow: "focus" | "break";
  t: any;
  onNext: () => void;
  onCancel: () => void;
}
