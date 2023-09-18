import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import { createStore } from "redux";
import Routes from "./routes";

const store = createStore(appReducer);

const Index = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
};

export default Index;
