interface IRegisterValueProps {
  type: "nota" | "moeda";
  quantity: number;
  value: number;
  denomination: string;
}

export const RegisterValue = (money: IRegisterValueProps[]) => {
  const total = money.reduce(
    (acc, item) => acc + (item.value / 100) * item.quantity,
    0,
  );
  return total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
