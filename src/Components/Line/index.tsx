import { Box } from "native-base";
import { View } from "react-native";
import { Colors } from "../../Constants/Styles";

interface PropsLines {
  height?: number;
}

function Line(props: PropsLines) {
  const DefaultHeight = props.height ? props.height : 0.8;

  return (
    <View style={{ elevation: 10 }}>
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.BLACK,
          height: DefaultHeight,
          opacity: 0.8,
          elevation: 3,
        }}
      />
    </View>
  );
}

export default Line;
