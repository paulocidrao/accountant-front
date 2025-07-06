import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center antialiased">
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
