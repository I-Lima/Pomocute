import { 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const width = Dimensions.get('window').width; // Remove to GlobalStyle
const height = Dimensions.get('window').height; // Remove to GlobalStyle

interface PropsComponent {
  title: string;
  backFunction: () => void;
}

function Header(props: PropsComponent) {

  return(
    <View style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>
          {props.title.toUpperCase()}
        </Text>

        <TouchableOpacity onPress={props.backFunction} >
          <Icon name="close" size={32} color='black' />
        </TouchableOpacity>
      </View>

      <View style={styles.lineBorder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width: width
  },
  contentTitle:{
    height: height / 14, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: width / 24 
  },
  title: {
    color: 'black', 
    fontSize: 24,
    fontFamily: 'Roboto-Bold', // Change to GlobalStyle
    textTransform: "capitalize"
  },
  lineBorder: {
    opacity: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#dadada',
  }
});

export default Header;