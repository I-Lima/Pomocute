import React, { useEffect } from "react";
import Routes from "./routes";
import { Providers } from "./Providers";
import { useNotification } from "./Shared/Hooks";

const Index = () => {
  const {
    actions: { init },
  } = useNotification();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default Index;
