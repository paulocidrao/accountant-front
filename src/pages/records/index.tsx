import { BackButton } from "@/components/BackButton";
import { CreateRecordsForm } from "@/components/CreateRecords";
import { ListMoney } from "@/components/ListMoney";
import { useTotalMoney } from "@/hooks/useTotalmoney";

export const Records = () => {
  const total = useTotalMoney();
  return (
    <>
      <section className="w-full  flex items-center justify-between p-4">
        <h1 className="text-2xl font-semibold">Cadastre um novo registro</h1>
        <div className=" items-center justify-center gap-6 flex">
          <span className="text-green-500 font-black text-2xl">
            Quantidade total: {total}
          </span>
          <BackButton />
        </div>
      </section>
      <section>
        <CreateRecordsForm />
        <ListMoney />
      </section>
    </>
  );
};
