import React from "react";
import { StyleSheet } from "react-native";
import Home from "./Screens/Home";

const Index = () => {
  return <Home />
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Index;
