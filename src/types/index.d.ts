import { Accordion } from "native-base";

declare module 'react-native-waveview';


declare namespace TimerTypes {
  export interface InputComponentProps {
    title: string;
    value: string;
    onChangeText: (time: string) => void;
  };

  export interface timerStateProps {
    focusTimer: number;
    restTimer: number;
    biggerRestTimer: number;
  };
};

declare namespace ColorTypes {
  export interface ColorComponentProps {
    selected: boolean;
    color: string;
    onPress: () => void;
  }

  export type colorTypes = 'y' | 'g' | 'p' | 'b';
};

declare namespace AccordionTypes {
  export interface AccordionProps {
    title: string;
    iconName?: string;
    childrenComponent: () => React.ReactNode;
  }
};

declare namespace ButtonPlayTypes {
  export interface ButtonPlayProps {
    onPressPlay?: () => void;
    onPressPause?: () => void;
    color: "yellow" | "white";
  };

  export interface ButtonPlayRef {
    changeTypeToPlay: () => void;
  };
};

declare namespace ButtonRefreshTypes {
  export interface PropsComponent {
    onPressRefresh?: () => void;
    color: "yellow" | "white";
  };
}

declare namespace EditButtonTypes {
  export interface EditButtonProps {
    onPressAdd: () => void;
    onPressRemove: () => void;
  };
};

declare namespace HeaderTypes {
  export interface PropsComponent {
    title: string;
    backFunction: () => void;
  };
};

declare namespace LineTypes {
  export interface PropsLines {
    height?: number;
  };
};

declare namespace TimerComponentTypes {
  export interface PropsTimer {
    time: Function;
    color: 'yellow' | 'white';
    functionality: 'start' | 'restart' | 'pause' | string;
  };
};

declare namespace HomeTypes {
  export interface ButtonPlayRef {
    changeTypeToPlay: () => void;
  };

  export interface StateType {
    timer: TimerTypes.timerStateProps;
    color: {
      color: ColorTypes.colorTypes,
      currentColor: {
        background: 'string',
        color: 'string'
      }
    };
  };
};

declare namespace ColorActionsTypes {
  export type ChangeColorType = (value: colorTypes) => {type: string, payload: {value: colorTypes}};
}
