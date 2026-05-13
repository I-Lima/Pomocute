import React, { ReactElement } from "react";
import { UserSettingsProvider } from "./userSettingsProvider";
import { NavigationContainer } from "@react-navigation/native";

export type ProvidersProps = {
  children: ReactElement;
};
export function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <UserSettingsProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </UserSettingsProvider>
  );
}
