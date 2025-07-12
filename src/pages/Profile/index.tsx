import { getUser, type IGetUser } from "@/api/get-user";
import { AssociateUserForm } from "@/components/AssociateUserForm";
import { CreateUserForm } from "@/components/createUserForm";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { cookies } from "@/lib/cookies";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
export const Profile = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    initialData: {} as IGetUser,
    queryFn: () => getUser(),
    queryKey: ["User"],
  });

  if (isLoading) {
    return <Loading />;
  }

  const deleteCookies = () => {
    cookies.remove("Token");
  };

  return (
    <>
      <section className=" w-full  flex p-4 items-center justify-between">
        {user.name ? (
          <h1 className="text-2xl ">Olá {user.name}</h1>
        ) : (
          <h1 className="text-2xl ">Bem-vindo novamente</h1>
        )}
        <Button
          className="w-20 font-bold"
          variant="destructive"
          onClick={() => {
            navigate("/auth/sign-in");
            deleteCookies();
          }}
        >
          Sair
        </Button>
      </section>
      {user.role !== "counselor" && (
        <>
          <section className="flex w-full items-center justify-center gap-16 ">
            <CreateUserForm />
            <AssociateUserForm />
          </section>
        </>
      )}
    </>
  );
};
