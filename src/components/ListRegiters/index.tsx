import {
  getAllRegisters,
  type IGetAllRegistersResponse,
} from "@/api/get-allRegisters";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { RegisterValue } from "@/hooks/useRegisterValue";
import { Search } from "lucide-react";
import { useState } from "react";

export const ListRegister = () => {
  const [search, setSearch] = useState("");
  const { data: registers, isLoading } = useQuery<IGetAllRegistersResponse[]>({
    initialData: [] as IGetAllRegistersResponse[],
    queryKey: ["registers"],
    queryFn: () => getAllRegisters(),
  });

  if (isLoading) {
    return <Loading />;
  }

  const filterRegisters = registers.filter(registers =>
    [registers.name].some(field => field.toLocaleLowerCase().includes(search)),
  );

  return (
    <>
      <span className="flex items-center outline-2 rounded gap-1 p-1 w-1/6 ml-3">
        <Search className="text-gray-400 size-5" />
        <input
          type="text"
          placeholder="Pesquise por um registro..."
          className="w-full outline-none"
          onChange={e => setSearch(e.target.value.trim())}
        />
      </span>
      <section className="w-full h-70Screen mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 mb-6 gap-5 p-4">
        {filterRegisters.map(resgister => (
          <>
            <div
              className={`${
                filterRegisters.length < 4 ? "h-1/2" : "h-full"
              }  w-full  flex flex-col items-start gap-3 rounded-lg border p-4 shadow-sm bg-white sm:p-3 md:p-4 lg:p-5`}
            >
              <p className="text-xl font-bold break-words">{resgister.name}</p>
              <p className="font-semibold text-sm break-words">
                Criado por: {resgister.counselorName}
              </p>
              <span className="text-xs line-clamp-2 break-words">
                {resgister.description}
              </span>
              <div className="mt-auto w-full pt-4 border-t">
                <p className="text-green-500 font-bold self-end-safe">
                  Total:{" "}
                  {RegisterValue(
                    resgister.moneys.map(money => ({
                      ...money,
                      type: money.type.toLowerCase() as "nota" | "moeda",
                    })),
                  )}
                </p>
              </div>
            </div>
          </>
        ))}
      </section>
    </>
  );
};
