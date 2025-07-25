import { ListRegister } from "@/components/ListRegiters";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="p-4 w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Seus registros</h1>
        <Button onClick={() => navigate("/records")} className="font-bold">
          Criar novo registro
        </Button>
      </section>
      <ListRegister />
    </>
  );
};
