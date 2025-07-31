import { BackButton } from "@/components/BackButton";

export const NotFound = () => {
  return (
    <section className="w-full h-screen p-1 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-xl lg:text-4xl font-bold">404</h1>
      <p className="font-semibold lg:text-xl text-center lg:leading-1">
        Ops! Parece que esta página não existe. Por favor, retorne à página
        inicial.
      </p>
      <BackButton />
    </section>
  );
};
