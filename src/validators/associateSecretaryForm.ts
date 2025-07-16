import z from "zod";

export const associateSecretaryFormSchema = z.object({
  secretaryEmail: z.string().email({ message: "Digite um email válido" }),
  companyEmail: z.string().email({ message: "Digite um email válido" }),
});

export type associateSecretaryForm = z.infer<
  typeof associateSecretaryFormSchema
>;
