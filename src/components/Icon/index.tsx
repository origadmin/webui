import * as React from "react";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

type IconType = React.ForwardRefExoticComponent<IconProps>;

const Icon = ({ name, size = 24, ...props }: IconProps) => {
  if (typeof name !== "string") return null;
  const variant = name.endsWith("-filled") ? "filled" : "outline";
  const iconName = name.replace(/(-filled|-outline)$/, "");
  return <img src={`/static/icons/${variant}/${iconName}.svg`} alt={iconName} width={size} height={size} {...props} />;
};

export { Icon };
export type { IconProps, IconType };
