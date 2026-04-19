export interface ModalFlowProps {
  visible: boolean;
  color: string;
  flow: "focus" | "break";
  onNext: () => void;
  onCancel: () => void;
}
