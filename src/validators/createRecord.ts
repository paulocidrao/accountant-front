import z from "zod";

export const formMoneySchema = z.object({
  denomination: z.string().min(1, { message: "Escolha um valor monetario" }),
  quantity: z
    .string()
    .min(1, { message: "Digite um numero maior do que 0" })
    .refine(val => val !== "0", { message: "O valor não pode ser 0" }),
});

export type formMoneyType = z.infer<typeof formMoneySchema>;

export const formInfoMoneySchema = z.object({
  name: z.string().min(1, { message: "Digite um nome para seu registro " }),
  description: z
    .string()
    .min(1, { message: "Digite a descição do seu registro" }),
});

export type formInfoMoneyType = z.infer<typeof formInfoMoneySchema>;
