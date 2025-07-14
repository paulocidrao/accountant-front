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

export const CreateCompanyForm = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<createCompanyFormType>({
    resolver: zodResolver(createCompanyFormSchema),
    defaultValues: {
      name: "",
      owner_email: "",
      document: "",
      phone: "",
      address: {
        zipCode: "",
        street: "",
        city: "",
        state: "",
        number: "",
        complement: "",
      },
    },
  });

  const getcepMutation = useMutation({
    mutationFn: () => getCep(getValues("address.zipCode")),
    onSuccess: response => {
      console.log("deu certo");
      setValue("address.state", response.estado);
      setValue("address.city", response.localidade);
      setValue("address.street", response.logradouro);
    },
  });

  return (
    <>
      <section className="flex  items-center justify-center">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-6 w-full max-w-2xl bg-white rounded shadow">
          <div className="space-y-2">
            <Label>Nome do responsável</Label>
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
            <Label>Email do responsável</Label>
            <input
              type="email"
              placeholder="digite o email aqui"
              className="outline-2 rounded p-2 w-full border"
              {...register("owner_email")}
            />
            {errors.owner_email && (
              <p className="text-red-500">{errors.owner_email.message}</p>
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
              {...register("address.zipCode")}
              type="text"
              placeholder="digite o CEP aqui"
              className="outline-2 rounded p-2 w-full border"
              onBlur={() => getcepMutation.mutate()}
            />
            {errors.address?.zipCode && (
              <p className="text-red-500">{errors.address.zipCode.message}</p>
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
          <div className="col-span-1 md:col-span-2 flex justify-end mt-4 w-full">
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
