import { StyleSheet, Dimensions } from 'react-native';

/*----------------- GLOBAL STYLES -----------------*/
// Colors
export const WHITE = '#FFFFFF';
export const YELLOW = '#F7CD64';
export const GRAY = '#F0F0F0';
export const BLACK = '#000000';
export const BACKGROUND_WHITE = '#FCFCFC';
export const BACKGROUND_GREEN = '#96E363';
export const BACKGROUND_BLUE = '#7CE3F3';
export const BACKGROUND_PINK = '#D96DCD';
export const BACKGROUND_YELLOW = '#FFDB81';
export const SELECT_COLOR = '#69C522';
export const CUSTOM_LOCAL = '#EBEBEB';

// Dimensions
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export const GlobalStyle = StyleSheet.create({
  // Fonts
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