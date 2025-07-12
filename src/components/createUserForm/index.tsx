import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  createUserFormSchema,
  type createUserForm,
} from "@/validators/createUserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/create-user";
import { toast } from "sonner";

export const CreateUserForm = () => {
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

  const handleFormSubmit = (data: createUserForm) => {
    createUserMutation.mutate(data);
  };
  return (
    <>
      <form
        className=" flex-col space-y-4 w-1/6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h2>Cadastre um usuário</h2>
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
        <Button
          disabled={!isValid || isSubmitting}
          className="font-bold w-full"
        >
          Cadastrar
        </Button>
      </form>
    </>
  );
};
