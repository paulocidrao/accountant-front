import z from "zod";

export const associateUserFormSchema = z.object({
  email: z.string().email({ message: "Por favor insira um email válido!" }),
});

export type associateUserForm = z.infer<typeof associateUserFormSchema>;
