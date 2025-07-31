import { deleteUser } from "@/api/delete-user";
import { getUser, type IGetUser } from "@/api/get-user";
import { AsscoiateSecretaryFrom } from "@/components/AssociateSecretaryForm";
import { AssociateUserForm } from "@/components/AssociateUserForm";
import { BackButton } from "@/components/BackButton";
import { CreateUserForm } from "@/components/createUserForm";
import { Dialog } from "@/components/Dialog";
import { ForgotPassword } from "@/components/ForgotPassword";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { UpdateUserAccount } from "@/components/UpdateUserAccount";
import { useLogOut } from "@/hooks/useLogout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export const Profile = () => {
  const logOut = useLogOut();
  const [openDialog, setOpenDialog] = useState(false);
  const [openExitDialog, setOpenExitDialog] = useState(false);
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
  const handleLogoutUser = () => {
    logOut();
  };

  return (
    <>
      <section className="w-full flex p-4 items-center justify-between">
        {user.name ? (
          <h1 className="text-2xl">Olá, {user.name}</h1>
        ) : (
          <h1 className="text-2xl">Bem-vindo novamente</h1>
        )}
        <div className="gap-5 flex items-center justify-center">
          <BackButton />
          <Button
            className="w-20 font-bold"
            variant="destructive"
            onClick={() => setOpenExitDialog(prev => !prev)}
          >
            Sair
          </Button>
        </div>
      </section>
      {user.role !== "counselor" && (
        <>
          <section className="flex flex-col md:flex-row items-center-safe justify-center-safe gap-16">
            <CreateUserForm />
            <AssociateUserForm />
            {user.role !== "adm" && <UpdateUserAccount />}
            {user.role === "adm" && <AsscoiateSecretaryFrom />}
            <ForgotPassword />
          </section>
        </>
      )}
      <section className="bg-red-50 border mb-16 border-red-200 rounded-lg p-6 mt-16 flex flex-col items-center shadow-sm w-sm mx-auto">
        <h3 className="text-xl font-semibold text-red-700 mb-2">
          Excluir sua conta
        </h3>
        <span className="text-sm text-red-600 mb-4 text-center">
          Se você excluir sua conta, todos os seus dados serão apagados e não
          poderão ser recuperados. Tem certeza que deseja continuar?
        </span>
        <Button
          variant="destructive"
          className="w-full font-bold"
          onClick={() => setOpenDialog(prev => !prev)}
        >
          Excluir Conta
        </Button>
      </section>
      <Dialog
        description="Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
        open={openDialog}
        setOpen={setOpenDialog}
        onAction={handleDeleteUser}
        title="Excluir conta"
      />
      <Dialog
        description="Você está prestes a sair da sua conta. Para voltar, basta fazer login novamente."
        open={openExitDialog}
        setOpen={setOpenExitDialog}
        onAction={handleLogoutUser}
        title="Sair da conta"
      />
    </>
  );
};
