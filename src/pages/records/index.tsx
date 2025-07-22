import { CreateRecordsForm } from "@/components/CreateRecords";
import { ListMoney } from "@/components/ListMoney";

export const Records = () => {
  return (
    <>
      <section className="w-full flex">
        <h1 className="text-2xl font-semibold">Cadastre um novo registro</h1>
      </section>
      <section>
        <CreateRecordsForm />
        <ListMoney />
      </section>
    </>
  );
};
