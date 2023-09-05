import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dimension, Fonts } from "../../Constants/Styles";
import { HeaderTypes } from "../../types";

function Header(props: HeaderTypes.PropsComponent) {
  const { title, backFunction } = props;

  return (
    <View style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={[styles.title, Fonts.ROBOTO_BOLD]}>
          {title.toUpperCase()}
        </Text>

        <TouchableOpacity onPress={backFunction}>
          <Icon name="close" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.lineBorder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimension.WIDTH,
  },
  contentTitle: {
    height: Dimension.HEIGHT / 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Dimension.WIDTH / 24,
  },
  title: {
    color: "black",
    fontSize: 24,
    textTransform: "capitalize",
  },
  lineBorder: {
    opacity: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#dadada",
  },
});

export default Header;
