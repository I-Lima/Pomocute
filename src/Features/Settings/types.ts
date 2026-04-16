import CustomStatesHook from "src/Shared/Hooks/customStates";
import z from "zod";

export interface ISettings {
  visible: boolean;
  customStateHook: ReturnType<typeof CustomStatesHook>;
  onClose: () => void;
}

const durationSchema = z
  .string()
  .min(1, "The field is required")
  .refine((val) => !Number.isNaN(Number(val)), {
    message: "Must be a number",
  })
  .refine((val) => Number(val) >= 1, {
    message: "The value must be greater than 0",
  })
  .refine((val) => Number(val) <= 60, {
    message: "The value must be less than 60",
  });

export const createSettingsSchema = z.object({
  focusDuration: durationSchema,
  breakDuration: durationSchema,
  themeColor: z.number(),
});

export type SettingsFormData = z.infer<typeof createSettingsSchema>;
