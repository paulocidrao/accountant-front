import { useState, type ReactNode } from "react";
import { RecordContext } from "./RecordContext";
import type { MoneyType } from "@/@types/moneyArray";

interface RecordContexProviderProps {
  children: ReactNode;
}

export const RecordContexProvider = ({
  children,
}: RecordContexProviderProps) => {
  const [money, setMoney] = useState<MoneyType[]>([]);
  return (
    <RecordContext.Provider value={{ money, setMoney }}>
      {children}
    </RecordContext.Provider>
  );
};
