import { useCallback, useState } from "react";

export const useCapsLockOnCheck = () => {
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);

  const handleCapsLockCheck = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockActive(event.getModifierState("CapsLock"));
  }, []);

  return { isCapsLockActive, handleCapsLockCheck };
};

