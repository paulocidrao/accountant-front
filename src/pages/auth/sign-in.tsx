import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loginFormSchema, type loginForm } from "@/validators/loginForm";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

export const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<loginForm>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: loginForm) => login(data),
    onSuccess: () => {
      toast.success("Login feito com sucesso!", { duration: 2000 });
      navigate("/home");
    },
    onError: () => {
      toast.error("Opps! Verifique seus dados", { duration: 1000 });
    },
  });

  const handleFormSubmit = (data: loginForm) => {
    loginMutation.mutate(data);
  };
  return (
    <>
      <section className="w-full p-4 flex flex-col gap-7 items-center justify-center">
        <h1 className="text-2xl lg:text-2xl font-bold">Bem-vindo!</h1>
        <Card className="w-full sm:w-1/2 lg:w-1/4 max-w-full shadow-2xl">
          <CardHeader>
            <CardTitle className="">Faça login na sua conta!</CardTitle>
            <CardDescription>
              Use seu email e sua senha logo abaixo!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email">Email</Label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="seu@email.com"
                    className="outline-3 rounded p-1 w-full"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      to="/auth/forgotPassword"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    className="outline-3 rounded p-1 w-full"
                    placeholder="Digite sua senha"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="w-full font-bold text-md"
                >
                  {isSubmitting ? (
                    <div className="flex  items-center justify-center">
                      <Loader2 className="size-6 animate-spin text-white" />
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
