import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import {
  type associateUserForm,
  associateUserFormSchema,
} from "@/validators/associateUserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { associateUser } from "@/api/associate-user";
import { toast } from "sonner";

export const AssociateUserForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<associateUserForm>({
    resolver: zodResolver(associateUserFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const associateMutation = useMutation({
    mutationFn: (email: string) => associateUser(email),
    onSuccess: () => {
      toast.success("Usuário associado com sucesso");
      reset();
    },
    onError() {
      toast.error("Usuário não encontrado");
    },
  });

  const handleAssociateUser = (data: associateUserForm) => {
    associateMutation.mutate(data.email);
  };

  return (
    <form
      className="space-y-4 md:w-1/6 w-1/2 "
      onSubmit={handleSubmit(handleAssociateUser)}
    >
      <h2 className="text-lg font-semibold text-center">Associe um usuário</h2>
      <div className="grid gap-4">
        <Label htmlFor="email">Email</Label>
        <input
          {...register("email")}
          className="outline-2 rounded p-2 w-full border border-gray-300  focus:outline-none"
          type="email"
          placeholder="Digite o email do usuário"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <Button disabled={isSubmitting} className="font-bold w-full">
        Associar
      </Button>
    </form>
  );
};
