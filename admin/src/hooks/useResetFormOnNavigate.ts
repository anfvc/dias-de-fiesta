import { useEffect } from "react";

export const useResetFormOnNavigate = (resetFunction: () => void) => {
  useEffect(() => {
    resetFunction();
  }, [resetFunction]);
};
