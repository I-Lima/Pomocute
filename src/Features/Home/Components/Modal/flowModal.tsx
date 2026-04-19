import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../../Shared/Theme";
import { ModalFlowProps } from "../../types/flowModal.type";

export function FlowModal(input: ModalFlowProps) {
  const { visible, onNext, onCancel, color, flow } = input;
  const breakMessage = "It's time to take a break!";
  const focusMessage = "It's time to focus!";

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: color,
                  },
                ]}
              >
                <Icon
                  name="alarm-on"
                  size={36}
                  color={colors.white}
                  style={styles.icon}
                />
              </View>

              <Text style={styles.title}>
                {flow === "focus" ? breakMessage : focusMessage}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonPrimary,
                  {
                    backgroundColor: color,
                  },
                ]}
                onPress={onNext}
              >
                <Text style={styles.buttonTextPrimary}>Start</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={onCancel}
              >
                <Text style={styles.buttonTextSecondary}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "85%",
    height: "30%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 10,
    borderRadius: 10,
  },
  icon: { margin: 4 },
  title: {
    flex: 1,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttonPrimary: {
    height: 48,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  buttonSecondary: {
    height: 48,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextPrimary: { color: colors.white, fontSize: 16 },
  buttonTextSecondary: { color: colors.disabled, fontSize: 14 },
});
