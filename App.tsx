import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <View>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="gray"
      />

      <SafeAreaView style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: "center"}} >
        <Text style={{ fontSize: 40 }}>
          HOME
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default App;
