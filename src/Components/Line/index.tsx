import { View } from "react-native";
import { Colors } from "../../Constants/Styles";
import { LineTypes } from "../../types";

function Line(props: LineTypes.PropsLines) {
  const DefaultHeight = props.height ? props.height : 0.8;

  return (
    <View style={{ elevation: 10 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.BLACK,
          height: DefaultHeight,
          opacity: 0.2,
          elevation: 3,
        }}
      />
    </View>
  );
}

export default Line;
