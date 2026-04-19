import React, { useEffect } from "react";
import { useUserSettings } from "../Shared/Hooks";
import { UserSettingsProviderParams } from "src/Shared/Types";
import { UserSettingsContext } from "../Contexts/userSettingsContext";

export const UserSettingsProvider = ({
  children,
}: UserSettingsProviderParams) => {
  const userSettings = useUserSettings();

  useEffect(() => {
    userSettings.actions.loadCustomStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserSettingsContext.Provider value={userSettings}>
      {children}
    </UserSettingsContext.Provider>
  );
};
