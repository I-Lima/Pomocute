import { Box } from "native-base";
import { TouchableOpacity, View } from "react-native";
import { Colors } from "../../Constants";

function Line() {
  return(
    <View
      style={{ elevation: 10, }}
    >
    <View
      style={{
        width: '100%',
        backgroundColor: Colors.BLACK,
        height: 1,
        opacity: 0.5,
        shadowColor: 'gray',
        shadowOffset: {
          height: 0,
          width: 50,
        }
      }}
    />
 </View>
  );
};

export default Line;
