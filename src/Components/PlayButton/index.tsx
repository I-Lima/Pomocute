import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Constants';
interface PropsComponent {
  pressFunction: () => any;
  color: "yellow" | "white";
  type: "play" | "refresh" | "pause";
}

function ButtonPlay(props: PropsComponent) {
  const { color, pressFunction, type } = props;
  const colorButton = color === "yellow" ? Colors.YELLOW : Colors.WHITE;
  const colorIcon = color === "yellow" ? Colors.WHITE : Colors.YELLOW;

 return (
  <TouchableOpacity
    onPress={pressFunction}
    style={[styles.buttonContainer, { backgroundColor: colorButton }]}
  >
    {type === "play" &&
      <Icon name="play" size={56} color={colorIcon} />
    }

    {type === "pause" &&
      <Icon name="pause" size={70} color={colorIcon} />
    }

    {type === "refresh" &&
      <Icon name="refresh" size={56} color={colorIcon} />
    }
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
      width: 88,
      height: 88,
      borderRadius: 50,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: Colors.BLACK,
      shadowRadius: 50,
      elevation: 5
  }
});

export default ButtonPlay;