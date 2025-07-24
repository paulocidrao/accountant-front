import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";
import { Trash2 } from "lucide-react";

export const ListMoney = () => {
  const { money, setMoney } = useRecordContext();

  const handleRemoveMoney = (id: string) => {
    const newMoney = money.filter(item => item.id !== id);
    setMoney(newMoney);
  };

  return (
    <>
      <section className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6  p-4 mb-6 gap-5">
        {money.length > 0 &&
          money.map(item => (
            <section className="flex flex-col sm:flex-row items-start sm:items-center w-full rounded-lg border p-4 shadow-sm bg-white gap-3">
              <div className="flex-1">
                {item.denomination < "1" ? (
                  <p className="font-semibold text-lg md:text-xl text-gray-700">
                    {`${item.type}s`} de {Number(item.denomination) * 100}{" "}
                    centavos
                  </p>
                ) : (
                  <p className="font-semibold text-lg md:text-xl text-gray-700">
                    {`${item.type}s`} de {Number(item.denomination)}{" "}
                    {Number(item.denomination) >= 1 ? "reais" : "centavos"}
                  </p>
                )}

                <p className="text-sm text-gray-500">
                  Quantidade: {item.quantity}
                </p>
                <span className="text-green-600 font-medium block mt-1">
                  Valor total: R${" "}
                  {(Number(item.denomination) * item.quantity).toFixed(2)}
                </span>
              </div>
              <Trash2
                className="mb-2 sm:mb-0 sm:mr-4 cursor-pointer text-red-600"
                onClick={() => handleRemoveMoney(item.id)}
              />
            </section>
          ))}
      </section>
    </>
  );
};
