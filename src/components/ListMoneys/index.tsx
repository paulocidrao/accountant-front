import type { MoneyType } from "@/@types/moneyArray";

interface ListMoneysProps {
  allMoney: MoneyType;
}

export const ListMoneys = (allMoney: ListMoneysProps) => {
  const { allMoney: moneyValues } = allMoney;

  return (
    <>
      <section>
        <p>
          {`${moneyValues.type}s `} de {moneyValues.denomination}
        </p>
        <p>Quantidade: {moneyValues.quantity}</p>
        <span>
          Valor total:{" "}
          {Number(moneyValues.denomination) * 100 * moneyValues.quantity}
        </span>
      </section>
    </>
  );
};
