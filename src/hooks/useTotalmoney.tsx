import { useMemo } from "react";
import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";

export const useTotalMoney = () => {
  const { money } = useRecordContext();

  const totalAmount = useMemo(() => {
    return money.reduce((amount, item) => {
      return amount + Number(item.denomination) * item.quantity;
    }, 0);
  }, [money]);

  return totalAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
