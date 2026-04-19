export type useUserSettingsParams = {
  focusDuration: string;
  breakDuration: string;
  themeColor: number;
};

export type InitialStateParams = useUserSettingsParams & {
  primaryColor: string;
};
