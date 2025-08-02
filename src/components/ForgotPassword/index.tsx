import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import {
  forgotPassowrdFormSchema,
  type ForgotPasswordForm,
} from "@/validators/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "@/api/update-userPassword";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const ForgotPassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPassowrdFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordForm) => updateUserPassword(data),
    onSuccess: () => {
      reset();
      toast.success("Senha alterada com sucesso");
    },
    onError: () => {
      toast.error("Oops! Houve um erro ao alterar a senha!");
    },
  });

  const handleForgotPassword = (data: ForgotPasswordForm) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <section className="flex w-full md:w-1/4 lg:w-1/3 xl:w-1/4 2xl:w-1/6 items-center justify-center p-2 mt-2">
      <form
        className="space-y-4 w-full max-w-md"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <h2 className="font-semibold text-xl text-center">
          Atualize a senha de um usuário
        </h2>
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Email:</Label>
          <input
            className="p-1.5 outline-2 rounded w-full"
            {...register("email")}
            placeholder="Digite o email do usuário"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-semibold">Senha:</Label>
          <input
            {...register("newPassword")}
            className="p-1.5 outline-2 rounded w-full"
            placeholder="Digite a nova senha"
          />
        </div>
        <Button
          disabled={isSubmitting || !isValid}
          className="w-full font-bold disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex  items-center justify-center">
              <Loader2 className="size-6 animate-spin text-white" />
            </div>
          ) : (
            "Atualizar senha"
          )}
        </Button>
      </form>
    </section>
  );
};
