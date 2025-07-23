import { useContext } from "react";
import { RecordContext } from "./RecordContext";

export const useRecordContext = () => {
  return useContext(RecordContext);
};
