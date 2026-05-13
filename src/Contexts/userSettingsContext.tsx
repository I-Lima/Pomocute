import { createContext } from "react";
import { useUserSettings } from "../Shared/Hooks";

type UserSettingsContextType = ReturnType<typeof useUserSettings>;

export const UserSettingsContext =
  createContext<UserSettingsContextType | null>(null);
