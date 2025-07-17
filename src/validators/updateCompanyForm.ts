import z from "zod";

export const updateCompanyFormSchema = z.object({
  phone: z.string().min(1, { message: "Digite um telefone válido" }),
  address: z.object({
    zipcode: z.string().min(8, { message: "Digite um CEP válido" }),
    street: z.string().min(1, { message: "Digite o nome da rua" }),
    state: z.string().min(1, { message: "Digite o nome do Estado" }),
    complement: z.string().nullable(),
    city: z.string().min(1, { message: "Digite o nome da cidade" }),
    number: z.string().min(1, { message: "Digite o numero" }),
  }),
});

export type updateCompanyFormType = z.infer<typeof updateCompanyFormSchema>;
