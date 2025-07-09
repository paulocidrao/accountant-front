import { getUser, type IGetUser } from "@/api/get-user";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";

export const Profile = () => {
  const { data: user, isLoading } = useQuery({
    initialData: {} as IGetUser,
    queryFn: () => getUser(),
    queryKey: ["User"],
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className=" w-full  flex p-4 items-center justify-between">
        <h1 className="text-2xl ">Olá {user.name}</h1>
        <Button className="w-20 font-bold" variant="destructive">
          Sair
        </Button>
      </section>
      {user.role !== "counselor" && <p> Formulario para criação de usuário </p>}
    </>
  );
};
