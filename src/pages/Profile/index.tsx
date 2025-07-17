import { deleteUser } from "@/api/delete-user";
import { getUser, type IGetUser } from "@/api/get-user";
import { AsscoiateSecretaryFrom } from "@/components/AssociateSecretaryForm";
import { AssociateUserForm } from "@/components/AssociateUserForm";
import { CreateUserForm } from "@/components/createUserForm";
import { Dialog } from "@/components/Dialog";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useLogOut } from "@/hooks/useLogout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export const Profile = () => {
  const logOut = useLogOut();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    initialData: {} as IGetUser,
    queryFn: () => getUser(),
    queryKey: ["User"],
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(user.id),
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      navigate("/auth/sign-in");
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  return (
    <>
      <section className=" h-full w-full  flex p-4 items-center justify-between">
        {user.name ? (
          <h1 className="text-2xl ">Olá {user.name}</h1>
        ) : (
          <h1 className="text-2xl ">Bem-vindo novamente</h1>
        )}
        <Button
          className="w-20 font-bold"
          variant="destructive"
          onClick={logOut}
        >
          Sair
        </Button>
      </section>
      {user.role !== "counselor" && (
        <>
          <section className="flex w-full items-center justify-center gap-16 ">
            <CreateUserForm />
            <AssociateUserForm />
            {user.role === "adm" && <AsscoiateSecretaryFrom />}
          </section>
        </>
      )}
      <section className="bg-red-50 border mb-16 border-red-200 rounded-lg p-6 mt-8 flex flex-col items-center shadow-sm max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-red-700 mb-2">
          Deletar sua conta
        </h3>
        <span className="text-sm text-red-600 mb-4 text-center">
          Ao deletar, todas as suas informações serão excluídas permanentemente!
        </span>
        <Button
          variant="destructive"
          className="w-full font-bold"
          onClick={() => setOpenDialog(prev => !prev)}
        >
          Deletar Conta
        </Button>
      </section>
      <Dialog
        description="Você tem certeza disso ? "
        open={openDialog}
        setOpen={setOpenDialog}
        onAction={handleDeleteUser}
        title="Você quer realmente deletar a sua conta?"
      />
    </>
  );
};
