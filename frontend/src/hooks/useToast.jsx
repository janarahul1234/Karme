import { toast } from "sonner";
import { CircleCheckBig, CircleX, Info } from "lucide-react";

import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";

const icons = {
  info: Info,
  success: CircleCheckBig,
  error: CircleX,
};

const useToast = () => {
  const showToast = (variant, title, duration = 5000) => {
    const Icon = icons[variant] || icons.success;

    toast.custom(
      (t) => (
        <Alert variant={variant} close onClose={() => toast.dismiss(t)}>
          <AlertIcon>
            <Icon />
          </AlertIcon>
          <AlertTitle className="font-medium">{title}</AlertTitle>
        </Alert>
      ),
      { duration }
    );
  };

  return {
    info: (title, duration) => showToast("info", title, duration),
    success: (title, duration) => showToast("success", title, duration),
    error: (title, duration) => showToast("error", title, duration),
  };
};

export default useToast;
