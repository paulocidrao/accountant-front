import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Por favor insira um email válido!" }),
  password: z.string().min(6),
});

export type loginForm = z.infer<typeof loginFormSchema>;
