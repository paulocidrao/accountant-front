import { getUser, type IGetUser } from "@/api/get-user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  updateUserFormSchema,
  type UpdateUserForm,
} from "@/validators/updateUserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/api/update_user";
import { toast } from "sonner";

export const UpdateUserAccount = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserFormSchema),
  });

  const { data: user, isLoading } = useQuery({
    initialData: {} as IGetUser,
    queryFn: () => getUser(),
    queryKey: ["User"],
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, reset]);

  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserForm) => updateUser(user.id, data),
    onSuccess: () => {
      toast.success("Cadastro atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Oops! Houve um erro ao atualizar seu cadastro!");
    },
  });

  const handleUpdateUser = (data: UpdateUserForm) => {
    updateUserMutation.mutate(data);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <section className="flex w-full md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/6 items-center justify-center p-2 mt-2">
        <form
          className="space-y-4 w-full max-w-md"
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <h2 className="font-semibold text-xl">Atualize seus dados</h2>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Email:</Label>
            <input
              className="p-1.5 outline-2 rounded w-full"
              {...register("email")}
              placeholder="digite seu email"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold">Telefone:</Label>
            <input
              {...register("phone")}
              className="p-1.5 outline-2 rounded w-full"
              placeholder="digite seu telefone"
            />
          </div>
          <Button
            disabled={isSubmitting}
            className="w-full font-bold disabled:cursor-not-allowed"
          >
            Atualizar
          </Button>
        </form>
      </section>
    </>
  );
};
