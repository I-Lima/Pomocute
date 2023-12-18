import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Dimension, Fonts } from "../../../Constants/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ContentFinalCycleProps {
  cancelPress: (v: boolean) => void;
  nextPress: () => void;
  backgroundColor: string;
  color: string;
}

export function ContentFinalCycle({
  cancelPress,
  nextPress,
  backgroundColor,
  color,
}: ContentFinalCycleProps) {
  return (
    <View style={[styles.content, { backgroundColor: color }]}>
      <View style={{ margin: Dimension.WIDTH / 14 }}>
        <TouchableOpacity
          onPress={() => cancelPress(true)}
          style={styles.closeButton}
        >
          <Icon name="close" size={36} color="black" />
        </TouchableOpacity>

        <View>
          <View style={styles.textContainer}>
            <Text style={[Fonts.COMFORTAA_BOLD, styles.title]}>Parabéns</Text>

            <Text style={[Fonts.COMFORTAA_BOLD, styles.text]}>
              Você finalizou um ciclo, deseja iniciar um novo ?
            </Text>
          </View>

          <View style={}>
            <TouchableOpacity
              onPress={nextPress}
              style={[
                styles.buttonContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <Icon name="skip-next" size={Dimension.WIDTH / 6} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 8,
  },
  closeButton: {
    alignItems: "flex-end",
    marginBottom: Dimension.HEIGHT / 24,
  },
  textContainer: {
    marginBottom: Dimension.HEIGHT / 14,
  },
  title: {
    fontSize: 44,
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  containerButton: {
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 5,
  },
});
