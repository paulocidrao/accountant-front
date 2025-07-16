import z from "zod";

export const createCompanyFormSchema = z.object({
  name: z.string().min(1, { message: "Digite o nome" }),
  document: z.string().min(14, { message: "Digite um CNPJ válido" }),
  email: z.string().email({ message: "Digite um email válido" }),
  phone: z.string().min(1, { message: "Digite um telefone válido" }),
  address: z.object({
    zipcode: z.string().min(1, { message: "Digite um CEP válido" }),
    street: z.string().min(1, { message: "Digite o nome da rua" }),
    state: z.string().min(1, { message: "Digite o nome do Estado" }),
    complement: z.string().nullable(),
    city: z.string().min(1, { message: "Digite o nome da cidade" }),
    number: z.string().min(1, { message: "Digite o numero" }),
  }),
});

export type createCompanyFormType = z.infer<typeof createCompanyFormSchema>;
