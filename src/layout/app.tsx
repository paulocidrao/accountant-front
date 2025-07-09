import { TokenIsValid } from "@/components/functions";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Calculator, User2, Cog } from "lucide-react";
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
      <main className="min-h-screen flex flex-col items-center justify-center antialiased">
        <header className="fixed bg-primary p-4 w-full flex top-0 justify-between items-center">
          <Calculator className="size-16 text-white" />
          <section className="items-center gap-4 flex">
            <Cog className="text-white size-8" />
            <User2 className="text-white size-8" />
          </section>
        </header>
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
