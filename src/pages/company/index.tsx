import { getUser, type IGetUser } from "@/api/get-user";
import { BackButton } from "@/components/BackButton";
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
      <section className="w-full p-4 flex items-center justify-between">
        <h1 className="text-2xl">Olá,{user.name}</h1>
        <BackButton />
      </section>
      <section>{user.role === "adm" && <CreateCompanyForm />}</section>
    </>
  );
};
