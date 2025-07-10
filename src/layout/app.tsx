import { TokenIsValid } from "@/components/functions";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Calculator, User2, Cog } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = TokenIsValid();
    if (!token?.isTokenValid) {
      navigate("/auth/sign-in", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <header className=" bg-primary p-4 w-full flex top-0 justify-between items-center">
        <Calculator className="size-16 text-white" />
        <section className="items-center gap-4 flex">
          <Tooltip>
            <TooltipTrigger>
              <Cog className="text-white size-8" />
              <TooltipContent side="bottom">Configurações</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <User2
                className="text-white size-8"
                onClick={() => navigate("/user")}
              />
              <TooltipContent side="bottom">Seu Perfil</TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </section>
      </header>
      <main className="flex flex-col antialiased">
        <Outlet />
      </main>
      <footer className="fixed bottom-0 w-full text-center py-4 bg-white">
        <p className="text-sm text-gray-600">
          Desenvolvido por Paulo Cidrão © {new Date().getFullYear()} - Todos os
          direitos reservados
        </p>
      </footer>
    </>
  );
};
