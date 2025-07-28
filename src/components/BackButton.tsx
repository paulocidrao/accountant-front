import { useNavigate } from "react-router";
import { Button } from "./ui/button";

interface BackButtonProps {
  route?: string;
}

export const BackButton = ({ route }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => (route ? navigate(route) : navigate(-1))}
      className="font-bold"
    >
      Voltar
    </Button>
  );
};
