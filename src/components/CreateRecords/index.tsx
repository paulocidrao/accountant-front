import { Money } from "@/constants";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { MoneyType } from "@/@types/moneyArray";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  formInfoMoneySchema,
  formMoneySchema,
  type formInfoMoneyType,
  type formMoneyType,
} from "@/validators/createRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";
import { useMutation } from "@tanstack/react-query";
import { createRecords, type ICreateRecords } from "@/api/create-record";
import { toast } from "sonner";

export const CreateRecordsForm = () => {
  const { setMoney, money } = useRecordContext();

  const formMoney = useForm<formMoneyType>({
    resolver: zodResolver(formMoneySchema),
    defaultValues: {
      denomination: "",
      quantity: "",
    },
  });
  const formInfo = useForm<formInfoMoneyType>({
    resolver: zodResolver(formInfoMoneySchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const handleinfoFormMoney = (data: formMoneyType) => {
    const newMoney: MoneyType = {
      id: Date.now().toString(),
      denomination: data.denomination,
      quantity: Number(data.quantity),
      type: data.denomination > "1" ? "nota" : "moeda",
    };

    setMoney([...money, newMoney]);
    formMoney.reset({
      denomination: "",
      quantity: "0",
    });
  };

  const createRecordMutation = useMutation({
    mutationFn: (data: ICreateRecords) => createRecords(data),
    onSuccess: () => {
      toast.success("Registro cadastrado com sucesso!");
      formInfo.reset({
        description: "",
        name: "",
      });
      setMoney([]);
    },
    onError: () => {
      toast.error("Opps! aconteceu algo de errado tente novamente!");
    },
  });

  const handleCreateRecord = (data: formInfoMoneyType) => {
    const payload = { ...data, moneys: money };
    createRecordMutation.mutate(payload);
  };

  return (
    <>
      <section className="flex items-center h-70Screen justify-center gap-24 ">
        <Form {...formInfo}>
          <form
            className="space-y-4 w-96"
            onSubmit={formInfo.handleSubmit(handleCreateRecord)}
          >
            <FormField
              control={formInfo.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do registro</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="EX: vendas dia 21/07/2024"
                      className="outline-2 p-1 rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formInfo.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="EX:vendas de sapatos"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={money.length === 0 || !formInfo.formState.isValid}
              className="w-full font-bold"
            >
              Cadastrar
            </Button>
          </form>
        </Form>

        <Form {...formMoney}>
          <form
            className="space-y-4 w-96 flex-col"
            onSubmit={formMoney.handleSubmit(handleinfoFormMoney)}
          >
            <FormField
              control={formMoney.control}
              name="denomination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione os valores monetarios</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um valor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dinheiro</SelectLabel>
                        {Money.map(money => (
                          <SelectItem key={money.id} value={money.value}>
                            {money.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMoney.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite um núemro maior que 0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="font-bold w-full">Adicionar</Button>
          </form>
        </Form>
      </section>
    </>
  );
};
