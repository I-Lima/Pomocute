import { useContext, useEffect } from "react";
import { UserSettingsContext } from "../../../Contexts";
import { useNavigation } from "@react-navigation/native";

export function useBootstrap() {
  const { state } = useContext(UserSettingsContext) ?? {};
  const navigation = useNavigation();

  useEffect(() => {
    if (state?.primaryColor) {
      setTimeout(() => navigation.navigate("Home"), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    state: {
      primaryColor: state?.primaryColor,
    },
    actions: {},
  };
}
