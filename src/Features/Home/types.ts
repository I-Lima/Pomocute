export interface IBackground {
  children: React.ReactElement;
  backgroundColor: string;
  circlesColor: string;
}

export interface IActionButtonProps {
  icon: string;
  active?: boolean;
  onPress: () => void;
}

export interface ISettingsButtonProps {
  onPress: () => void;
}

export interface ITag {
  type: "focus" | "break";
}
