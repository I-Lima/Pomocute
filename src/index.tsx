import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import { createStore } from "redux";
import Routes from "./routes";
import { loadColorStateFromAsyncStorage } from "./reducers/colorReducer";

const Index = () => {
  const [preloadStates, setPreloadStates] = useState({});

  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const data = await loadColorStateFromAsyncStorage();
        setPreloadStates({color: data});
      } catch (error) {return; }
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
