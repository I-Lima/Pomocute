import useCustomStates from "src/Shared/Hooks/useCustomStates";
import z from "zod";

export interface ISettings {
  visible: boolean;
  customStateHook: ReturnType<typeof useCustomStates>;
  color: string;
  onClose: () => void;
}

// Const durationSchema = z
//   .string()
//   .min(1, "The field is required")
//   .refine((val) => !Number.isNaN(Number(val)), {
//     Message: "Must be a number",
//   })
//   .refine((val) => Number(val) >= 1, {
//     Message: "The value must be greater than 0",
//   })
//   .refine((val) => Number(val) <= 60, {
//     Message: "The value must be less than 60",
//   });

export const createSettingsSchema = z.object({
  focusDuration: z.string(),
  breakDuration: z.string(),
  themeColor: z.number(),
});

export type SettingsFormData = z.infer<typeof createSettingsSchema>;
