export type SaveCustomStateParams = {
  focusDuration: string;
  breakDuration: string;
  themeColor: number;
};

export type InitialStateParams = SaveCustomStateParams & {
  primaryColor: string;
};
