import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";

export const ListMoney = () => {
  const { money } = useRecordContext();
  console.log(money);
  return (
    <>
      <section className="w-full mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6 gap-5">
        {money.length > 0 &&
          money.map(item => (
            <section className="flex items-center w-full rounded-lg border p-4 shadow-sm bg-white">
              <div>
                {item.denomination < "1" ? (
                  <p className="font-semibold text-xl text-gray-700">
                    {`${item.type}s`} de {Number(item.denomination) * 100}{" "}
                    centavos
                  </p>
                ) : (
                  <p className="font-semibold text-xl text-gray-700">
                    {`${item.type}s`} de {Number(item.denomination)}{" "}
                    {Number(item.denomination) >= 1 ? "reais" : "centavos"}
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  Quantidade: {item.quantity}
                </p>
                <span className="text-green-600 font-medium">
                  Valor total: R${" "}
                  {(Number(item.denomination) * item.quantity).toFixed(2)}
                </span>
              </div>
            </section>
          ))}
      </section>
    </>
  );
};
