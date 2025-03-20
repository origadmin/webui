import { ForwardRefExoticComponent, ImgHTMLAttributes, RefAttributes } from "react";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

type IconType = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

const TablerIcon = ({ name, size = 24, ...props }: IconProps) => {
  // if (typeof name !== "string") return name;
  const variant = name.endsWith("-filled") ? "filled" : "outline";
  const iconName = name.replace(/(-filled|-outline)$/, "");
  return <img src={`/static/icons/${variant}/${iconName}.svg`} alt={iconName} width={size} height={size} {...props} />;
};

export default TablerIcon;
export type { IconProps, IconType };
