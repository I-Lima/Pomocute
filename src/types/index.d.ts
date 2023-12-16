declare module "react-native-waveview";
declare module "react-native-alarm-notification";

export declare namespace TimerTypes {
  export interface InputComponentProps {
    title: string;
    value: string;
    onChangeText: (time: string) => void;
  }

  export interface timerStateProps {
    focusTimer: number;
    restTimer: number;
    biggerRestTimer: number;
    inFocus: boolean;
    cyclesCount: number;
  }

  export interface asyncTimerTypes {
    focusTimer?: number;
    restTimer?: number;
    biggerRestTimer?: number;
    inFocus?: boolean;
  }
}

export declare namespace ColorTypes {
  export interface ColorComponentProps {
    selected: boolean;
    color: string;
    onPress: () => void;
    accessibilityLabel: string;
  }

  export type colorTypes = "y" | "g" | "p" | "b";
}

export declare namespace modalTypes {
  export interface modalProps {
    modalVisible: boolean;
  }
}

export declare namespace AccordionTypes {
  export interface AccordionProps {
    title: string;
    iconName?: string;
    childrenComponent: () => React.ReactNode;
  }
}

export declare namespace ButtonPlayTypes {
  export interface ButtonPlayProps {
    onPressPlay: () => void;
    onPressPause: () => void;
    isPlay: boolean;
  }

  export interface ButtonPlayRef {
    changeTypeToPlay: () => void;
  }
}

export declare namespace ButtonRefreshTypes {
  export interface PropsComponent {
    onPressRefresh?: () => void;
  }
}

export declare namespace EditButtonTypes {
  export interface EditButtonProps {
    onPressAdd: () => void;
    onPressRemove: () => void;
  }
}

export declare namespace HeaderTypes {
  export interface PropsComponent {
    title: string;
    backFunction: () => void;
  }
}

export declare namespace LineTypes {
  export interface PropsLines {
    height?: number;
  }
}

export declare namespace TimerComponentTypes {
  export interface PropsTimer {
    time: Function;
    functionality: "start" | "restart" | "pause" | string;
  }
}

export declare namespace HomeTypes {
  export interface ButtonPlayRef {
    changeTypeToPlay: () => void;
  }

  export interface StateType {
    timer: TimerTypes.timerStateProps;
    color: {
      color: ColorTypes.colorTypes;
      currentColor: {
        background: "string";
        color: "string";
      };
    };
    modal: modalTypes.modalProps;
  }
}

export declare namespace ColorActionsTypes {
  export type ChangeColorType = (value: colorTypes) => {
    type: string;
    payload: { value: colorTypes };
  };
}
