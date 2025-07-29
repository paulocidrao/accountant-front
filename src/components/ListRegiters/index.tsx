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
import { transformDate } from "@/functions";
import { getLastWeekRegisters } from "@/api/get-lasWeekRegisters";
import { queryClient } from "@/lib/react-query";

export const ListRegister = () => {
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { data: registers, isLoading } = useQuery<IGetAllRegistersResponse[]>({
    initialData: [],
    placeholderData: [],
    queryKey: ["registers"],
    queryFn: () => getAllRegisters(),
    refetchOnMount: true,
    enabled: true,
  });
  const { data: registersofWeek, isLoading: weekLoad } = useQuery<
    IGetAllRegistersResponse[]
  >({
    initialData: [],
    placeholderData: [],
    queryKey: ["lastWeekRegisters"],
    queryFn: () => getLastWeekRegisters(),
    enabled: isFilter,
  });

  if (isLoading || filterLoading || weekLoad) {
    return <Loading />;
  }

  const filterRegisters = (isFilter ? registersofWeek : registers).filter(
    registers =>
      [registers.name].some(field =>
        field.toLocaleLowerCase().includes(search),
      ),
  );

  const handleInvalidateQuery = () => {
    setIsFilter(true);
    setFilterLoading(true);
    queryClient
      .invalidateQueries({ queryKey: ["registers"] })
      .finally(() => setFilterLoading(false));
  };
  const handleCleanRegister = () => {
    setIsFilter(false);
    setFilterLoading(true);

    queryClient
      .invalidateQueries({ queryKey: ["lastWeekRegisters"] })
      .finally(() => setFilterLoading(false));
  };

  return (
    <>
      <span className="flex p-4 items-center justify-between  w-full ">
        <div className="outline-2 flex items-center rounded gap-1 p-1">
          <Search className="text-gray-400 size-5" />
          <input
            type="text"
            placeholder="Pesquise por um registro..."
            className="w-full outline-none"
            onChange={e => setSearch(e.target.value.trim())}
          />
        </div>
        <div className="flex items-center gap-2 mr-3">
          <span className="text-gray-600 font-medium">Filtro:</span>
          {!isFilter && (
            <Button
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
              onClick={() => {
                handleInvalidateQuery();
              }}
            >
              Registros da última semana
            </Button>
          )}
          {isFilter && (
            <Button
              variant="outline"
              className="hover:bg-gray-100 transition-colors"
              onClick={() => {
                handleCleanRegister();
              }}
            >
              limpar filtro
            </Button>
          )}
        </div>
      </span>
      <section className="w-full lg:min-h-screen mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-5 p-4">
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
              className={`
              w-full flex flex-col items-start gap-4 rounded-lg border p-5
              bg-white h-full xl:h-1/2 lg:h-1/3 shadow
              
              `}
            >
              <p className="text-xl font-bold break-words text-gray-800 hover:text-gray-900">
                {resgister.name}
              </p>
              <div className="space-y-2">
                <p className="font-medium text-sm text-gray-600">
                  Criado por:{" "}
                  <span className="text-gray-800">
                    {resgister.counselorName}
                  </span>
                </p>
                <p className="font-medium text-sm text-gray-600">
                  Criado em:{" "}
                  <span className="text-gray-800">
                    {transformDate(resgister.createdAt)}
                  </span>
                </p>
              </div>
              <span className="text-sm line-clamp-2 break-words text-gray-600">
                {resgister.description}
              </span>
              <div className="mt-auto w-full pt-4 border-t border-gray-100">
                <p className="text-green-600 font-bold text-right transition-colors hover:text-green-700">
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
