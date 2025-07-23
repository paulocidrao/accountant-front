import {
  getAllRegisters,
  type IGetAllRegistersResponse,
} from "@/api/get-allRegisters";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { RegisterValue } from "@/hooks/useRegisterValue";

export const ListRegister = () => {
  const { data: registers, isLoading } = useQuery<IGetAllRegistersResponse[]>({
    initialData: [] as IGetAllRegistersResponse[],
    queryKey: ["registers"],
    queryFn: () => getAllRegisters(),
  });
  console.log("data registers", registers);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="w-full h-70Screen mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-6 gap-5">
        {registers.map(resgister => (
          <>
            <div className=" h-1/3  justify-between items-start flex flex-col w-full rounded-lg border p-4 shadow-sm bg-white">
              <p className="text-xl font-bold">{resgister.name}</p>
              <p className="font-semibold">
                Criado por: {resgister.counselorName}
              </p>
              <span className="text-xs line-clamp-2">
                {resgister.description}
              </span>
              <p className="text-green-500 font-bold">
                Total:{" "}
                {RegisterValue(
                  resgister.moneys.map(money => ({
                    ...money,
                    type: money.type.toLowerCase() as "nota" | "moeda",
                  })),
                )}
              </p>
            </div>
          </>
        ))}
      </section>
    </>
  );
};
