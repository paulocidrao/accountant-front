import z from "zod";

export const formMoneySchema = z.object({
  denomination: z.string({ required_error: "Selecione um valor" }),
  quantity: z.string({ required_error: "Digite um número" }),
});

export type formMoneyType = z.infer<typeof formMoneySchema>;
