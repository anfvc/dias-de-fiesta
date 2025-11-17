import { useState } from "react";

export const useTogglePassword = (password: string) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (password.trim() !== "") {
      setVisible(!visible);
    } //if there's no password, toggle off
  };

  const disabled = password.trim() === "";

  return {
    type: visible ? "text" : "password",
    visible,
    toggle,
    disabled,
  };
};
