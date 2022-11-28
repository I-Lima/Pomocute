import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, Dimension } from "../../Constants";

interface EditButtonProps {
  onPressVisible: () => void;
  visibleOptions: boolean;
  onPressAdd: () => void;
  onPressRemove: () => void;
}

function EditButton(props: EditButtonProps) {
  const { onPressVisible, visibleOptions, onPressAdd, onPressRemove } = props;
  const size = Dimension.WIDTH / 5;
  const sizeOptions = size - 16;

  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={[styles.buttonEdit, { width: size, height: size }]}
        onPress={onPressVisible}
      >
        {visibleOptions ? (
          <Icon name="close" size={size / 2} color={Colors.YELLOW} />
        ) : (
          <Icon name="edit" size={size / 2} color={Colors.YELLOW} />
        )}
      </TouchableOpacity>

      <View style={{ display: visibleOptions ? "flex" : "none" }}>
        <TouchableOpacity
          style={[
            styles.buttonRemove,
            { width: sizeOptions, height: sizeOptions },
          ]}
          onPress={onPressRemove}
        >
          <Icon name="remove" size={sizeOptions / 2} color={Colors.YELLOW} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonAdd,
            { width: sizeOptions, height: sizeOptions },
          ]}
          onPress={onPressAdd}
        >
          <Icon name="add" size={sizeOptions / 2} color={Colors.YELLOW} />
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
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderColor: Colors.GRAY,
    borderWidth: 0.5,
  },
  buttonRemove: {
    backgroundColor: Colors.BACKGROUND_WHITE,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderColor: Colors.GRAY,
    borderWidth: 0.5,
    marginBottom: 10,
  },
  buttonAdd: {
    backgroundColor: Colors.BACKGROUND_WHITE,
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
