import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  createCompanyFormSchema,
  type createCompanyFormType,
} from "@/validators/createCompanyForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { getCep } from "@/api/get-cep";
import { createCompany } from "@/api/create-company";
import { toast } from "sonner";

export const CreateCompanyForm = () => {
  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<createCompanyFormType>({
    resolver: zodResolver(createCompanyFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      document: "",
      phone: "",
      address: {
        zipcode: "",
        street: "",
        city: "",
        state: "",
        number: "",
        complement: "",
      },
    },
  });

  const getcepMutation = useMutation({
    mutationFn: () => getCep(getValues("address.zipcode")),
    onSuccess: response => {
      setValue("address.state", response.estado);
      setValue("address.city", response.localidade);
      setValue("address.street", response.logradouro);
    },
  });

  const createCompanyMutation = useMutation({
    mutationFn: (data: createCompanyFormType) => createCompany(data),
    onSuccess() {
      toast.success("Empresa cadastrada com sucesso!");
      reset();
    },
    onError() {
      toast.error("Oops! Aconteceu algo de errado!");
    },
  });

  const handleCreateCompany = (data: createCompanyFormType) => {
    createCompanyMutation.mutate(data);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <h2 className="font-semibold text-2xl">Cadastre uma empresa</h2>
        <form
          onSubmit={handleSubmit(handleCreateCompany)}
          className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-4 p-6 w-full max-w-2xl bg-white rounded shadow"
        >
          <div className="space-y-2">
            <Label>Nome da empresa</Label>
            <input
              type="text"
              placeholder="digite o nome aqui"
              className="outline-2 rounded p-2 w-full border"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email da empresa</Label>
            <input
              type="email"
              placeholder="digite o email aqui"
              className="outline-2 rounded p-2 w-full border"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>CNPJ da empresa</Label>
            <input
              type="text"
              placeholder="digite o CNPJ aqui"
              className="outline-2 rounded p-2 w-full border"
              {...register("document")}
            />
            {errors.document && (
              <p className="text-red-500">{errors.document.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Telefone da empresa</Label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="digite o telefone aqui"
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
              placeholder="digite o CEP aqui"
              className="outline-2 rounded p-2 w-full border"
              onBlur={() => getcepMutation.mutate()}
            />
            {errors.address?.zipcode && (
              <p className="text-red-500">{errors.address.zipcode.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Rua</Label>
            <input
              {...register("address.street")}
              type="text"
              placeholder="digite a rua aqui"
              className="outline-2 rounded p-2 w-full border"
            />
            {errors.address?.street && (
              <p className="text-red-500">{errors.address.street.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Cidade</Label>
            <input
              type="text"
              {...register("address.city")}
              placeholder="digite a cidade aqui"
              className="outline-2 rounded p-2 w-full border"
            />
            {errors.address?.city && (
              <p className="text-red-500">{errors.address.city.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <input
              type="text"
              {...register("address.state")}
              placeholder="digite o Estado aqui"
              className="outline-2 rounded p-2 w-full border"
            />
            {errors.address?.state && (
              <p className="text-red-500">{errors.address.state.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Número</Label>
            <input
              {...register("address.number")}
              type="text"
              placeholder="digite o número aqui"
              className="outline-2 rounded p-2 w-full border"
            />
            {errors.address?.number && (
              <p className="text-red-500">{errors.address.number.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Complemento</Label>
            <input
              {...register("address.complement")}
              type="text"
              placeholder="digite o complemento aqui"
              className="outline-2 rounded p-2 w-full border"
            />
          </div>
          <div className="col-span-1 md:col-span-2 sm:col-span-2 flex justify-end mt-4 w-full">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="w-full font-bold disabled:cursor-not-allowed"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
