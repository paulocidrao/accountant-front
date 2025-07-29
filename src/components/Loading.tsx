import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
};
