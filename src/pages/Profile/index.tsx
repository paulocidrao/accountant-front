import { createUser } from "@/api/create-user";
import { getUser, type IGetUser } from "@/api/get-user";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cookies } from "@/lib/cookies";
import {
  createUserFormSchema,
  type createUserForm,
} from "@/validators/createUserForm";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export const Profile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<createUserForm>({
    resolver: zodResolver(createUserFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      role: "counselor",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (data: createUserForm) => createUser(data),
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!", { duration: 2000 });
      reset();
    },
    onError: () => {
      toast.error("Opps! Algo deu errado!", { duration: 1000 });
    },
  });

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

  const handleFormSubmit = (data: createUserForm) => {
    createUserMutation.mutate(data);
  };

  return (
    <>
      <section className=" w-full  flex p-4 items-center justify-between">
        <h1 className="text-2xl ">Olá {user.name}</h1>
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
        <section className="flex items-center justify-center ">
          <form
            className=" flex-col space-y-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="grid gap-4">
              <Label htmlFor="name">Nome completo</Label>
              <input
                className="outline-2 rounded p-1"
                type="text"
                placeholder="digite o nome completo"
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <input
                {...register("email")}
                className="outline-2 rounded p-1"
                type="email"
                placeholder="digite o email"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="phone">Telefone</Label>
              <input
                {...register("phone")}
                className="outline-2 rounded p-1"
                type="text"
                placeholder="digite o telefone"
              />
              {errors.phone?.message && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="grid gap-4">
              <Label htmlFor="password">Senha</Label>
              <input
                className="outline-2 rounded p-1"
                type="password"
                placeholder="crie uma senha"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button disabled={!isValid || isSubmitting} className="font-bold">
              Cadastrar
            </Button>
          </form>
        </section>
      )}
    </>
  );
};
