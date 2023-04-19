import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Timer from "./Components/Timer";

const Index = () => {
  const ref = React.createRef();

  return (
    <View>
      <StatusBar barStyle={"light-content"} backgroundColor="gray" />

      <SafeAreaView style={styles.container}>
        {/* <Text style={{ fontSize: 40 }}>
          HOME
        </Text> */}

        <Timer ref={ref} receivedTimer={2} />

        {/* <View>
          <TouchableOpacity
            onPress={() => ref.current.controllerTimer()}
            style={{
              backgroundColor: "red",
              width: 50,
            }}
          >
            <Text>PLAY</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    flex: 1,
  },
});

export default Index;
