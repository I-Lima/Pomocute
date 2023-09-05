import { StyleSheet, Dimensions } from 'react-native';

/*----------------- GLOBAL STYLES -----------------*/
export const Colors = {
  WHITE: '#FFFFFF',
  YELLOW: '#F7CD64',
  GRAY: '#F0F0F0',
  BLACK: '#000000',
  GREEN: '#96E363',
  BLUE: '#7CE3F3',
  PINK: '#D96DCD',
  BACKGROUND_WHITE: '#FCFCFC',
  BACKGROUND_YELLOW: '#FFDB81',
  BACKGROUND_GREEN: '#BBF894',
  BACKGROUND_PINK: '#F892EC',
  BACKGROUND_BLUE: '#93EEFC',
  SELECT_COLOR: '#69C522',
  CUSTOM_LOCAL: '#EBEBEB',
};

export const Dimension = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
}

export const Fonts = StyleSheet.create({
  COMFORTAA_BOLD: {
    fontFamily: 'Comfortaa-Bold',
  },
  ROBOTO_BOLD: {
    fontFamily: 'Roboto-Bold',
  },
  ROBOTO_MEDIUM: {
    fontFamily: 'Roboto-Medium',
  },
  ROBOTO_REGULAR: {
    fontFamily: 'Roboto-Regular',
  },
});
