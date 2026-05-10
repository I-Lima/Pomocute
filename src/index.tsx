import React, { useEffect } from "react";
import Routes from "./routes";
import { Providers } from "./Providers";
import { useNotification } from "./Shared/Hooks";

const Index = () => {
  const {
    actions: { init, onForeground },
  } = useNotification();

  useEffect(() => {
    init();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return onForeground(() => {});
  });

  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default Index;
