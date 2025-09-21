import { useState } from "react";

export const useTogglePassword = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);

  return {
    type: visible ? "text" : "password",
    visible,
    toggle,
  };
};
