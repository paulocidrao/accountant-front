import z from "zod";

export const forgotPassowrdFormSchema = z.object({
  newPassword: z.string().min(6, { message: "Digite uma senha válida" }),
  email: z.string().email({ message: "Por favor insira um email válido!" }),
});

export type ForgotPasswordForm = z.infer<typeof forgotPassowrdFormSchema>;
