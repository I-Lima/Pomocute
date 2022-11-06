import { Box } from "native-base";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimension, Fonts, Colors } from "../../Constants";
import Line from "../Line";

function Accordion() {
  return(
    <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
      <View style={{ width: Dimension.WIDTH - 20, flexDirection: "row", paddingHorizontal: 8, paddingVertical: 10, alignItems: 'center' }}>
        <Icon name="alarm-outline" size={48} color={Colors.BLACK} />

        <Text style={[ Fonts.ROBOTO_MEDIUM, { textTransform: 'capitalize', fontSize: 32, color: Colors.BLACK, marginLeft: 16 }]} >
          colores
        </Text>
      </View>


      <View style={{ display: 'flex', height: 20 }}>
        <Line  />

        <View>

        </View>
      </View>
    </Box>
  );
};

export default Accordion;
