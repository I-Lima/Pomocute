import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import ButtonPlay from './src/Components/ButtonPlay';

const App = () => {
  return (
    <View>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="gray"
      />

      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: "center"}} >

        <Text style={{ fontSize: 40 }}>
          HOME
        </Text>

      </SafeAreaView>
    </View>
  );
};

export default App;
