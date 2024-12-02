import React, { ComponentProps } from "react";

interface ICustomInputProps {
  autoFocus?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: ComponentProps<"input">["type"];
  value: string;
}

const CustomInput = (props: ICustomInputProps) => {
  const { onChange, value, ...rest } = props;
  return (
    <input
      {...rest}
      className="customInput"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CustomInput;
