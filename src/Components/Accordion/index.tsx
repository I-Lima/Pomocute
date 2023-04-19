import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimension, Fonts, Colors } from "../../Constants/Styles";
import Line from "../Line";

interface PropsAccordion {
  title: string;
  iconName?: string;
  childrenComponent: () => React.ReactNode;
  hided: boolean;
  onPress: () => void;
}

function Accordion(props: PropsAccordion) {
  const { title, iconName, childrenComponent, hided, onPress } = props;
  const defaultHided = hided ? "flex" : "none";

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchStyle}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.300"
        borderWidth="2"
        width={Dimension.WIDTH - 20}
        paddingY={2}
      >
        <View style={styles.content}>
          {iconName ? (
            <Icon
              name={iconName}
              size={Dimension.WIDTH * 0.12}
              color={Colors.BLACK}
              style={styles.iconStyle}
            />
          ) : null}

          <Text style={[Fonts.ROBOTO_MEDIUM, styles.title]}>{title}</Text>
        </View>

        <View style={[styles.hidedContainer, { display: defaultHided }]}>
          <Line />

          <View style={styles.hidedContent}>{childrenComponent()}</View>
        </View>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchStyle: {
    backgroundColor: "transparent",
  },
  content: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  iconStyle: {
    marginLeft: 4,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 28,
    color: Colors.BLACK,
    marginLeft: 16,
  },
  hidedContainer: {
    marginTop: 8,
  },
  hidedContent: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
});

export default Accordion;
