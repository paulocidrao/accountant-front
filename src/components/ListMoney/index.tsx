import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";

export const ListMoney = () => {
  const { money } = useRecordContext();

  return (
    <>
      {money.length > 0 &&
        money.map(item => (
          <section>
            <p>
              {`${item.type}s `} de {item.denomination}
            </p>
            <p>Quantidade: {item.quantity}</p>
            <span>
              Valor total: R${" "}
              {(Number(item.denomination) * item.quantity).toFixed(2)}
            </span>
          </section>
        ))}
    </>
  );
};
