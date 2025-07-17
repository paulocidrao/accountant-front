import { getUser, type IGetUser } from "@/api/get-user";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { UpdateCompanyForm } from "@/components/UpdateCompanyForm";
import { useLogOut } from "@/hooks/useLogout";
import { useQuery } from "@tanstack/react-query";

export const Config = () => {
  const logOut = useLogOut();
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
      {user.companyId === null && (
        <section className="w-full flex-col gap-6 h-70Screen flex items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight ">
            Você ainda não está associado a sua empresa, tente novamente mais
            tarde!
          </span>
          <Button
            variant="destructive"
            className="w-2xs font-bold"
            onClick={logOut}
          >
            Sair
          </Button>
        </section>
      )}
      {user.role === "secretary" && (
        <section className="w-full h-70Screen mb-10 flex flex-col items-center justify-center">
          <UpdateCompanyForm id={user.companyId} />
        </section>
      )}
    </>
  );
};
