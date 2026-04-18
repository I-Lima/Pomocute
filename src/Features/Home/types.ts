export interface IBackground {
  children: React.ReactElement;
  backgroundColor: string;
  circlesColor: string;
}

export interface IActionButtonProps {
  icon: string;
  active?: boolean;
  color: string;
  onPress: () => void;
}

export interface ISettingsButtonProps {
  onPress: () => void;
}

export interface ITag {
  type: "focus" | "break";
  color: string;
}

export interface InputUseTimer {
  initialValue: number;
  isPlayingCallback: () => void;
  hasStartedCallback: () => void;
  changeFlowCallback: () => void;
}
