import React, { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SettingsParams,
  SettingsFormData,
  createSettingsSchema,
} from "../../types/settingsModal.type";
import { colors, colorPalettes } from "../../../../Shared/Theme";

export default function SettingsModal({
  visible,
  onClose,
  customStateHook,
  color,
  t,
}: Readonly<SettingsParams>) {
  const { state, actions } = customStateHook;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(createSettingsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset(state);
  }, [reset, state]);

  const selectedTheme = watch("themeColor");

  const handleNumericInput = (text: string) => text.replace(/[^\d]/g, "");

  const onValid = (data: SettingsFormData) => {
    actions.saveCustomStates(data);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      transparent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>{t("settings.settings")}</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close" size={32} color={colors.disabled} />
                </TouchableOpacity>
              </View>

              <View style={styles.bodyContent}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {t("settings.focusDuration")}
                  </Text>

                  <Controller
                    control={control}
                    name="focusDuration"
                    render={({ field }) => (
                      <TextInput
                        style={styles.input}
                        value={field.value ?? ""}
                        onChangeText={(text) =>
                          field.onChange(handleNumericInput(text))
                        }
                        keyboardType="numeric"
                      />
                    )}
                  />

                  {errors.focusDuration && (
                    <Text style={styles.inputLabel}>
                      {errors.focusDuration.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {t("settings.breakDuration")}
                  </Text>

                  <Controller
                    control={control}
                    name="breakDuration"
                    render={({ field }) => (
                      <TextInput
                        style={styles.input}
                        value={field.value ?? ""}
                        onChangeText={(text) =>
                          field.onChange(handleNumericInput(text))
                        }
                        keyboardType="numeric"
                      />
                    )}
                  />

                  {errors.breakDuration && (
                    <Text style={styles.inputLabel}>
                      {errors.breakDuration.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    {t("settings.themeColor")}
                  </Text>

                  <Controller
                    control={control}
                    name="themeColor"
                    render={({ field }) => (
                      <View style={styles.themeContainer}>
                        {colorPalettes.map((item) => {
                          const isSelected = item.id === selectedTheme;

                          return (
                            <TouchableOpacity
                              key={item.id}
                              style={[
                                styles.colorCircle,
                                { backgroundColor: item.color },
                                isSelected && styles.colorCircleSelected,
                              ]}
                              onPress={() => field.onChange(item.id)}
                            />
                          );
                        })}
                      </View>
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: color,
                  },
                ]}
                onPress={handleSubmit(onValid)}
              >
                <Text style={styles.buttonText}>
                  {t("settings.saveChanges")}
                </Text>
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
    color: colors.black,
    fontFamily: "Roboto-Medium",
  },
  bodyContent: { flex: 1 },
  inputContainer: { marginBottom: 16 },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
  },
  buttonText: { color: colors.white, fontSize: 16 },
  buttonDisabled: {
    backgroundColor: colors.disabled,
  },
});
