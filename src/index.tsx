import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes";

const Index = () => {
  const navigateRef = useRef(null);

  const navigateToHome = () => {
    navigateRef.current?.navigate("Home");
  };

  const loadAsyncData = async () => {
    navigateToHome();
  };

  useEffect(() => {
    loadAsyncData();
  }, []);

  return (
    <NavigationContainer ref={navigateRef}>
      <Routes />
    </NavigationContainer>
  );
};

export default Index;
