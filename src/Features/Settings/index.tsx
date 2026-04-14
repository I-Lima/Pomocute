import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ISettings } from "./types";
import { colors } from "../../Shared/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { colorPalettes } from "../../Shared/Theme/colorPalettes";

export default function Settings({ visible, setVisible }: Readonly<ISettings>) {
  const handleClose = () => setVisible(false);
  const [focusDuration, setFocusDuration] = useState("25");
  const [breakDuration, setBreakDuration] = useState("5");
  const [themeColor, setThemeColor] = useState(0);

  const changeThemeColor = (theme: { id: number; color: string }) => {
    setThemeColor(theme.id);
  };

  const handleNumericInput = (text: string) => {
    return text.replace(/[^\d]/g, "");
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
      animationType="fade"
      transparent
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={[styles.overlay]}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Settings</Text>

                <TouchableOpacity onPress={handleClose}>
                  <Icon name="close" size={32} color={colors.disabled} />
                </TouchableOpacity>
              </View>

              <View style={styles.bodyContent}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Focus Duration (min)</Text>

                  <TextInput
                    style={styles.input}
                    value={focusDuration}
                    onChangeText={(e) =>
                      setFocusDuration(handleNumericInput(e))
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Break Duration (min)</Text>

                  <TextInput
                    style={styles.input}
                    value={breakDuration}
                    onChangeText={(e) =>
                      setBreakDuration(handleNumericInput(e))
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Theme Color</Text>

                  <View style={styles.themeContainer}>
                    {colorPalettes.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.colorCircle,
                          item.id === themeColor && styles.colorCircleSelected,
                          { backgroundColor: item.color },
                        ]}
                        onPress={() => changeThemeColor(item)}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleClose}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    height: "65%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 24,
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
  },
  bodyContent: { flex: 1 },
  inputContainer: { marginBottom: 16 },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.active,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: colors.bgWhite,
    borderColor: colors.active,
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  themeContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorCircle: {
    height: 48,
    width: 48,
    borderRadius: 100,
    marginRight: 8,
    marginBottom: 8,
    borderColor: colors.black,
    borderStyle: "dashed",
  },
  colorCircleSelected: {
    borderWidth: 2,
  },
  button: {
    height: 48,
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: colors.white, fontSize: 16 },
});
