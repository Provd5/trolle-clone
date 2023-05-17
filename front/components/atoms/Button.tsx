import type { FC } from "react";
import { ButtonHTMLAttributes } from "react";

export type buttonColorTypes =
  | "errorColor"
  | "grayColor"
  | "defaultColor"
  | "none";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  color: buttonColorTypes;
  restClassNames?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  color,
  restClassNames,
  ...restProps
}) => {
  const colorClasses = {
    errorColor: "errorColor",
    grayColor: "grayColor",
    defaultColor: "defaultColor",
    none: "",
  };

  const className = `flex items-center justify-center rounded-md px-[13px] py-[7px] transition-colors md:px-[16px] md:py-[9px] ${
    colorClasses[color] || ""
  } ${restClassNames ?? ""}`;

  return (
    <button className={className} {...restProps}>
      {children}
    </button>
  );
};
