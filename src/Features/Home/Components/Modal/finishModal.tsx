import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../../Shared/Theme";
import { ModalFinishProps } from "../../Types";

export function FinishModal(params: Readonly<ModalFinishProps>) {
  const { visible, color, onFinish, onReset, t } = params;

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
                  name="check-circle-outline"
                  size={36}
                  color={colors.white}
                  style={styles.icon}
                />
              </View>

              <Text style={styles.title}>{t("finishModal.greatWork")}</Text>
            </View>

            <Text style={styles.description}>
              {t("finishModal.description")}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.buttonPrimary,
                  {
                    backgroundColor: color,
                  },
                ]}
                onPress={onReset}
              >
                <Text style={styles.buttonTextPrimary}>
                  {t("finishModal.newCycle")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={onFinish}
              >
                <Text style={styles.buttonTextSecondary}>
                  {t("finishModal.finish")}
                </Text>
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
    height: "42%",
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
  description: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
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
