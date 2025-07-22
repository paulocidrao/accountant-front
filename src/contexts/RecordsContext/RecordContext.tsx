import type { MoneyType } from "@/@types/moneyArray";
import { createContext } from "react";

interface RecordContextProps {
  money: MoneyType[];
  setMoney: React.Dispatch<React.SetStateAction<MoneyType[]>>;
}

export const initialValue: RecordContextProps = {
  money: [],
  setMoney: () => {},
};

export const RecordContext = createContext<RecordContextProps>(initialValue);
