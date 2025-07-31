import { BackButton } from "@/components/BackButton";

export const ForgotPassword = () => {
  return (
    <section className="w-full p-1 flex flex-col gap-4 items-center justify-center">
      <h1 className="text-xl lg:text-4xl font-bold">Importante!</h1>
      <p className="font-semibold lg:text-xl text-center lg:leading-1">
        Para atualizar a sua senha você deve entrar em contato com um
        responsável da sua empresa!
      </p>
      <BackButton />
    </section>
  );
};
