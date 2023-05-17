import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons/lib";

import { buttonColorTypes } from "./Button";

interface CommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  color: buttonColorTypes;
  restClassNames?: string;
}

interface WithIcon extends CommonProps {
  Icon: IconType;
  iconSize: iconColorTypes;
}

interface WithoutIcon extends CommonProps {
  Icon?: undefined;
  iconSize?: never;
}

type ButtonIconProps = WithIcon | WithoutIcon;

type iconColorTypes = "icon" | "iconSm" | "iconXs";

export const ButtonIcon: FC<ButtonIconProps> = ({
  children,
  color,
  restClassNames,
  Icon,
  iconSize,
  ...restProps
}) => {
  const colorClasses = {
    errorColor: "errorColor",
    grayColor: "grayColor",
    defaultColor: "defaultColor",
    none: "",
  };

  const iconClasses = {
    icon: "icon",
    iconSm: "iconSm",
    iconXs: "iconXs",
  };

  const className = `flex h-[32px] w-[32px] flex-none items-center justify-center rounded-md transition-colors md:h-[36px] md:w-[36px] ${
    colorClasses[color] || ""
  } ${restClassNames ?? ""}`;

  return (
    <button className={className} {...restProps}>
      {Icon && <Icon className={iconSize ? iconClasses[iconSize] : ""} />}
      {children}
    </button>
  );
};
