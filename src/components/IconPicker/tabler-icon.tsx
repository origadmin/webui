import { getIcon } from "@/utils/icons";
import { ForwardRefExoticComponent, ImgHTMLAttributes, RefAttributes } from "react";

type IconProps = {
  name: string;
  size?: number;
  color?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

type IconType = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

const TablerIcon = ({ name, size = 24, ...props }: IconProps) => {
  if (!name) {
    return null;
  }
  if (typeof name !== "string") {
    const IconComponent = name;
    return <IconComponent size={size} {...props} />;
  }
  const Icon = getIcon(name);
  return <Icon size={size} {...props} />;
};

export default TablerIcon;
export type { IconProps, IconType };
