import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  associateSecretaryFormSchema,
  type associateSecretaryForm,
} from "@/validators/associateSecretaryForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  associateSecretary,
  type associateSecretaryRequest,
} from "@/api/associate-secretary";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const AsscoiateSecretaryFrom = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<associateSecretaryForm>({
    resolver: zodResolver(associateSecretaryFormSchema),
    mode: "onChange",
    defaultValues: {
      companyEmail: "",
      secretaryEmail: "",
    },
  });

  const associateSecretaryMutation = useMutation({
    mutationFn: (data: associateSecretaryRequest) => associateSecretary(data),
    onSuccess: () => {
      toast.success("Secretario(a) associado com sucesso!");
      reset();
    },
    onError: () => {
      toast.error("Erro ao associar o secretario(a)!");
    },
  });

  const handleAssociateSecretary = (data: associateSecretaryForm) => {
    associateSecretaryMutation.mutate(data);
  };

  return (
    <>
      <form
        className="space-y-4 w-1/2 md:w-1/6 "
        onSubmit={handleSubmit(handleAssociateSecretary)}
      >
        <h2 className="text-lg font-semibold text-center">
          Associe um secretario(a)
        </h2>
        <div className="grid gap-4">
          <Label>Email do secretario(a)</Label>
          <input
            {...register("secretaryEmail")}
            type="email"
            placeholder="Digite o email aqui"
            className="outline-2 rounded p-1"
          />
          {errors.secretaryEmail && (
            <p className="text-red-500">{errors.secretaryEmail.message}</p>
          )}
        </div>
        <div className="grid gap-4">
          <Label>Emaiil da empresa</Label>
          <input
            {...register("companyEmail")}
            type="email"
            placeholder="Digite o email aqui"
            className="outline-2 rounded p-1"
          />
          {errors.companyEmail && (
            <p className="text-red-500">{errors.companyEmail.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting} className="w-full font-bold">
          {isSubmitting ? (
            <div className="flex  items-center justify-center">
              <Loader2 className="size-6 animate-spin text-white" />
            </div>
          ) : (
            "Associar"
          )}
        </Button>
      </form>
    </>
  );
};
