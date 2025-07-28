import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  getCompanyById,
  type IGetCompanyIdResponse,
} from "@/api/get-companyById";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateCompanyFormSchema,
  type updateCompanyFormType,
} from "@/validators/updateCompanyForm";
import { Loading } from "../Loading";
import { useEffect } from "react";
import { getCep } from "@/api/get-cep";
import { updateCompany } from "@/api/update-company";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { BackButton } from "../BackButton";

interface UpdateCompanyFormProps {
  id: string;
}

export const UpdateCompanyForm = ({ id }: UpdateCompanyFormProps) => {
  const { data: company, isLoading } = useQuery({
    initialData: {} as IGetCompanyIdResponse,
    queryFn: () => getCompanyById(id),
    queryKey: ["Company"],
    retry: 1,
  });

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateCompanyFormType>({
    resolver: zodResolver(updateCompanyFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (company && company.address) {
      reset({
        phone: company.phone ?? "",
        address: {
          city: company.address.city ?? "",
          complement: company.address.complement ?? "",
          zipcode: company.address.zipcode ?? "",
          number: company.address.number ?? "",
          state: company.address.state ?? "",
          street: company.address.street ?? "",
        },
      });
    }
  }, [company, reset]);

  const getcepMutation = useMutation({
    mutationFn: () => getCep(getValues("address.zipcode")),
    onSuccess: response => {
      setValue("address.state", response.estado);
      setValue("address.city", response.localidade);
      setValue("address.street", response.logradouro ?? "");
    },
  });

  const updateCompanyMutation = useMutation({
    mutationFn: (data: updateCompanyFormType) => updateCompany(id, data),
    onSuccess: () => {
      reset();
      toast.success("Cadastro atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Ooops! Algo deu errado");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["Company"] });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdateCompany = (data: updateCompanyFormType) => {
    updateCompanyMutation.mutate(data);
  };

  return (
    <>
      <section className="flex w-full items-center justify-between p-2 mt-2">
        <h1 className="text-2xl w-full p-4 font-semibold items-start">
          Atualize o cadastro da empresa
        </h1>
        <BackButton />
      </section>
      <form
        className="space-y-4 grid grid-cols-2 gap-4 p-4 items-center justify-center"
        onSubmit={handleSubmit(handleUpdateCompany)}
      >
        <div className="space-y-2">
          <Label>Telefone da empresa</Label>
          <input
            {...register("phone")}
            placeholder="Digite aqui o novo numero de telefone da empresa"
            className="outline-2 rounded p-2 w-full border"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>CEP</Label>
          <input
            {...register("address.zipcode")}
            type="text"
            maxLength={8}
            placeholder="digite o CEP aqui"
            className="outline-2 rounded p-2 w-full border"
            onBlur={() => getcepMutation.mutate()}
          />
        </div>
        <div className="space-y-2">
          <Label>Rua</Label>
          <input
            type="text"
            {...register("address.street")}
            placeholder="digite a rua aqui"
            className="outline-2 rounded p-2 w-full border"
          />
        </div>
        <div className="space-y-2">
          <Label>Cidade</Label>
          <input
            type="text"
            {...register("address.city")}
            placeholder="digite a cidade aqui"
            className="outline-2 rounded p-2 w-full border"
          />
        </div>
        <div className="space-y-2">
          <Label>Estado</Label>
          <input
            type="text"
            {...register("address.state")}
            placeholder="digite o Estado aqui"
            className="outline-2 rounded p-2 w-full border"
          />
        </div>
        <div className="space-y-2">
          <Label>Número</Label>
          <input
            type="text"
            {...register("address.number")}
            placeholder="digite o número aqui"
            className="outline-2 rounded p-2 w-full border"
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Complemento</Label>
          <input
            type="text"
            {...register("address.complement")}
            placeholder="digite o complemento aqui"
            className="outline-2 rounded p-2 w-full border"
          />
        </div>
        <div className="col-span-2 md:col-span-2 flex justify-end mt-4 w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold disabled:cursor-not-allowed"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </>
  );
};
