import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import { createStore } from "redux";
import { loadColorStateFromAsyncStorage } from "./reducers/colorReducer";
import { loadTimerStateFromAsyncStorage } from "./reducers/timerReducer";
import { NavigationContainer} from "@react-navigation/native";
import Routes from "./routes";

const Index = () => {
  const [preloadStates, setPreloadStates] = useState({});
  const navigateRef = useRef(null);

  const navigateToHome = () => {
    navigateRef.current?.navigate("Home")
  };

  const loadAsyncData = async () => {
    try {
      const dataColor = await loadColorStateFromAsyncStorage();
      const dataTimer = await loadTimerStateFromAsyncStorage();
      setPreloadStates({ color: dataColor, timer: dataTimer });
    } catch (error) {
      return;
    }

    navigateToHome()
  };

  useEffect(() => {
    loadAsyncData();
  }, []);

  const store = createStore(appReducer, preloadStates);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigateRef}>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default Index;
