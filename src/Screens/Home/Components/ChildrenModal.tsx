import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Fonts, Dimension, Colors } from "../../../Constants/Styles";

interface ChildrenModalProps {
  inFocus: boolean;
  backgroundColor: string;
  handleCancelClick: () => void;
  handleNextClick: () => void;
}

export const ChildrenModal = ({
  inFocus,
  backgroundColor,
  handleCancelClick,
  handleNextClick,
}: ChildrenModalProps) => (
  <View style={styles.container}>
    <Text style={[Fonts.COMFORTAA_BOLD, styles.title]}>
      {inFocus ? "Hora da Pausa" : "Hora de focar"}
    </Text>

    <View style={styles.contentButtons}>
      <TouchableOpacity onPress={handleCancelClick}>
        <Text style={[Fonts.ROBOTO_REGULAR, styles.cancelButton]}>
          Cancelar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.goButton, { backgroundColor: backgroundColor }]}
        onPress={handleNextClick}
      >
        <Text style={[Fonts.ROBOTO_MEDIUM, styles.goButtonText]}>Seguir</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: Dimension.HEIGHT / 3.4,
    width: Dimension.WIDTH / 1.2,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 0.8,
    marginTop: Dimension.HEIGHT / 4,
    elevation: 2,
  },
  title: {
    fontSize: Dimension.WIDTH / 8.5,
    textAlign: "center",
  },
  contentButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "flex-end",
  },
  cancelButton: {
    textDecorationLine: "underline",
    fontSize: Dimension.WIDTH / 18,
  },
  goButton: {
    borderRadius: 5,
    borderColor: Colors.BLACK,
    borderWidth: 0.8,
  },
  goButtonText: {
    fontSize: Dimension.WIDTH / 18,
    marginVertical: 8,
    marginHorizontal: 10,
  },
});
