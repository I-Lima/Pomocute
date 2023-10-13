import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import { createStore } from "redux";
import Routes from "./routes";
import { loadColorStateFromAsyncStorage } from "./reducers/colorReducer";
import { loadTimerStateFromAsyncStorage } from "./reducers/timerReducer";

const Index = () => {
  const [preloadStates, setPreloadStates] = useState({});

  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const dataColor = await loadColorStateFromAsyncStorage();
        const dataTimer = await loadTimerStateFromAsyncStorage();
        setPreloadStates({ color: dataColor, timer: dataTimer });
      } catch (error) {
        return;
      }
    };

    loadAsyncData();
  }, []);

  const store = createStore(appReducer, preloadStates);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default Index;
