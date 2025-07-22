import { Money } from "@/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
import { formMoneySchema, type formMoneyType } from "@/validators/createRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecordContext } from "@/contexts/RecordsContext/useRecordContext";

export const CreateRecordsForm = () => {
  const { setMoney, money } = useRecordContext();

  const formMoney = useForm<formMoneyType>({
    resolver: zodResolver(formMoneySchema),
    defaultValues: {
      denomination: "",
      quantity: "",
    },
  });

  const handleinfoFormMoney = (data: formMoneyType) => {
    const newMoney: MoneyType = {
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

  return (
    <>
      <section className="flex items-center h-70Screen justify-center gap-24 ">
        <form className="space-y-4 w-96">
          <div className="grid gap-4">
            <Label>Nome do registro</Label>
            <Input
              type="text"
              placeholder="EX: vendas dia 21/07/2024"
              className="outline-2 p-1 rounded"
            />
            <div className="grid gap-4">
              <Label>Descrição</Label>
              <Textarea
                placeholder="EX:vendas de sapatos"
                className="resize-none h-24"
              />
            </div>
          </div>
        </form>
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
                  <FormLabel>Selecio os valores monetarios</FormLabel>
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
                      placeholder="digite um núemro maior que 0"
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
