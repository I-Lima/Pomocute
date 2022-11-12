import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  return (
    <View>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="gray"
      />

      <SafeAreaView style={styles.container} >
        <Text style={{ fontSize: 40 }}>
          HOME
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: "center"
  }
});

export default Index;
