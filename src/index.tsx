import React from "react";
import { StyleSheet } from "react-native";
import Home from "./Screens/Home";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import { createStore } from "redux";

const store = createStore(appReducer);

const Index = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
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
