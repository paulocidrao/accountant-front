import {
  getAllRegisters,
  type IGetAllRegistersResponse,
} from "@/api/get-allRegisters";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { RegisterValue } from "@/hooks/useRegisterValue";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export const ListRegister = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { data: registers, isLoading } = useQuery<IGetAllRegistersResponse[]>({
    initialData: [],
    placeholderData: [],
    queryKey: ["registers"],
    queryFn: () => getAllRegisters(),
    refetchOnMount: true,
    enabled: true,
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
      <section className="w-full min-h-screen mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-5 p-4">
        {registers.length === 0 && (
          <span className="grid place-items-center col-span-full">
            <p>Você não tem nenhum registro no momento!</p>
            <Button onClick={() => navigate("/records")} className="font-bold">
              Criar novo registro
            </Button>
          </span>
        )}
        {filterRegisters.length === 0 && (
          <span className="grid place-items-center col-span-full">
            <p>Não foi possivel encontrar esse registro</p>
          </span>
        )}
        {filterRegisters.map(resgister => (
          <>
            <div
              key={resgister.id}
              className={`${
                filterRegisters.length < 4 ? "h-1/3" : "h-full"
              }  w-full  flex flex-col  items-start gap-3 rounded-lg border p-4 shadow-sm bg-white sm:p-3 md:p-4 lg:p-5`}
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
