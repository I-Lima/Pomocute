import z from "zod";

export interface ISettings {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const createSettingsSchema = z.object({
  focusDuration: z.string().nonempty("The field is required"),
  breakDuration: z.string().nonempty("The field is required"),
  themeColor: z.number(),
});

export type SettingsFormData = z.infer<typeof createSettingsSchema>;
