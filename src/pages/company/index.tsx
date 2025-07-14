import { getUser, type IGetUser } from "@/api/get-user";
import { CreateCompanyForm } from "@/components/CreateCompanyForm";
import { Loading } from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";

export const Company = () => {
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
      <section className="w-full p-4">
        <h1 className="text-2xl">Olá,{user.name}</h1>
      </section>
      <section>{user.role === "adm" && <CreateCompanyForm />}</section>
    </>
  );
};
