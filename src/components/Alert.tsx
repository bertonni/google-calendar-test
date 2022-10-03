import React from "react";
import { IAlertProps } from "../@types/types";

const Alert = ({ variant = "success", message, close }: IAlertProps) => {
  const colors =
    variant === "error"
      ? "bg-rose-300 border-rose-700 text-rose-700"
      : variant === "success"
      ? "bg-emerald-300 border-emerald-700 text-emerald-700"
      : "bg-amber-300 border-amber-700 text-amber-670";

  return (
    <div className={`absolute bottom-20 left-0 right-0 ml-auto mr-auto h-fit py-3 px-6 flex items-center
      justify-center border rounded w-fit ${colors}`}>
      <span onClick={close} className="absolute right-1 top-0 p-1 cursor-pointer hover:brightness-125">
        x
      </span>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
