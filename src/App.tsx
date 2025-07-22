import { RouterProvider } from "react-router";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "sonner";
import { RecordContexProvider } from "./contexts/RecordsContext";

export const App = () => {
  return (
    <>
      <RecordContexProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster richColors closeButton={true} />
        </QueryClientProvider>
      </RecordContexProvider>
    </>
  );
};
