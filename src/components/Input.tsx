import React from "react";
import { IInputProps } from "../@types/types";

const Input = ({
  id,
  name,
  label = "",
  autocomplete,
  placeholder = "",
  refs,
  min,
  max,
  value = "",
  fullWidth,
  handleChange = () => null,
  type = "text",
}: IInputProps) => {
  return (
    <div className={`flex flex-col gap-1 py-1 group ${fullWidth && 'w-full'}`}>
      <label htmlFor={id} className="font-medium text-gray-600 group-focus-within:text-sky-600">
        {label}
      </label>
      <input
        id={id}
        className="input focus:outline-1 outline-sky-600 transition-all"
        autoComplete={autocomplete ? "on" : "off"}
        placeholder={placeholder}
        {...refs(name)}
        min={min}
        max={max}
        type={type}
        defaultValue={value}
        onChange={(val) => handleChange(val.target.value)}
      />
    </div>
  );
};

export default Input;
