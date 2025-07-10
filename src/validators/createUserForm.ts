import z from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(1, { message: "Digite um nome válido" }),
  phone: z.string().min(8, { message: "Digite um número válido" }),
  email: z.string().email({ message: "Por favor insira um email válido!" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 dígitos" }),
  role: z.enum(["adm", "counselor", "secretary"]),
});

export type createUserForm = z.infer<typeof createUserFormSchema>;
