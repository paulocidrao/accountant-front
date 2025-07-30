import z from "zod";

export const updateUserFormSchema = z.object({
  phone: z.string().min(8, { message: "Digite um número válido" }),
  email: z.string().email({ message: "Por favor insira um email válido!" }),
});

export type UpdateUserForm = z.infer<typeof updateUserFormSchema>;
