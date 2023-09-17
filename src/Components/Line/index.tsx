import { StyleSheet, View } from "react-native";
import { Colors } from "../../Constants/Styles";
import { LineTypes } from "../../types";
import React from "react";

function Line(props: LineTypes.PropsLines) {
  const DefaultHeight = props.height ? props.height : 0.8;

  return (
    <View style={{ elevation: 10 }}>
      <View style={[styles.Line, { height: DefaultHeight }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  Line: {
    width: "100%",
    backgroundColor: Colors.BLACK,
    opacity: 0.2,
    elevation: 3,
  },
});

export default Line;
