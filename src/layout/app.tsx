import { TokenIsValid } from "@/functions";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Calculator, User2, Cog, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUser, type IGetUser } from "@/api/get-user";
import { Loading } from "@/components/Loading";
export const AppLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = TokenIsValid();
    if (!token?.isTokenValid) {
      navigate("/auth/sign-in", { replace: true });
    }
  }, [navigate]);

  const { data: user, isLoading } = useQuery({
    initialData: {} as IGetUser,
    queryFn: () => getUser(),
    queryKey: ["User"],
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header className="bg-primary p-4 w-full flex top-0 justify-between items-center">
        <Calculator className="size-16 text-white" />
        <section className="items-center gap-4 flex">
          {user.role === "adm" && (
            <>
              <Store
                className="text-white size-8 cursor-pointer"
                onClick={() => navigate("/company")}
              />
            </>
          )}

          <Cog
            className="text-white size-8 cursor-pointer"
            onClick={() => navigate("/configurations")}
          />
          <User2
            className="text-white size-8 cursor-pointer"
            onClick={() => navigate("/user")}
          />
        </section>
      </header>
      <main className="flex flex-col antialiased ">
        <Outlet />
        <footer className=" bottom-0 left-0 w-full text-center py-4 bg-white border-t">
          <p className="text-sm text-gray-600 font-semibold">
            Desenvolvido por Paulo Cidrão © {new Date().getFullYear()} - Todos
            os direitos reservados
          </p>
        </footer>
      </main>
    </>
  );
};
