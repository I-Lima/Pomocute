import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Dimension } from "../../Constants/Styles";
import { EditButtonTypes, HomeTypes } from "../../types";
import { useSelector } from "react-redux";

function EditButton({
  onPressAdd,
  onPressRemove,
}: EditButtonTypes.EditButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const size = Dimension.WIDTH / 6;
  const sizeOptions = size - 16;
  const colorState = useSelector((state: HomeTypes.StateType) => state.color);
  const timerState = useSelector((state: HomeTypes.StateType) => state.timer);
  const backgroundColor = timerState.inFocus
    ? Colors.BACKGROUND_WHITE
    : colorState.currentColor.color;
  const iconColor = timerState.inFocus
    ? colorState.currentColor.color
    : Colors.BACKGROUND_WHITE;

  const handleComponentVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={[
          styles.buttonEdit,
          { width: size, height: size, backgroundColor },
        ]}
        onPress={handleComponentVisibility}
      >
        {isVisible ? (
          <Icon name="close" size={size / 1.5} color={iconColor} />
        ) : (
          <Icon name="edit" size={size / 1.5} color={iconColor} />
        )}
      </TouchableOpacity>

      <View style={{ display: isVisible ? "flex" : "none" }}>
        <TouchableOpacity
          style={[
            styles.buttonRemove,
            { width: sizeOptions, height: sizeOptions, backgroundColor },
          ]}
          onPress={onPressRemove}
        >
          <Icon name="remove" size={sizeOptions / 2} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonAdd,
            { width: sizeOptions, height: sizeOptions, backgroundColor },
          ]}
          onPress={onPressAdd}
        >
          <Icon name="add" size={sizeOptions / 2} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    right: Dimension.WIDTH / 16,
    bottom: Dimension.HEIGHT / 24,
    flexDirection: "column-reverse",
    alignItems: "flex-end",
  },
  buttonEdit: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderColor: Colors.GRAY,
    borderWidth: 0.5,
  },
  buttonRemove: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderColor: Colors.GRAY,
    borderWidth: 0.5,
    marginBottom: 10,
  },
  buttonAdd: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderColor: Colors.GRAY,
    borderWidth: 0.5,
    marginBottom: 10,
  },
});

export default EditButton;
