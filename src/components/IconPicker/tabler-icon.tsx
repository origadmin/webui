import { ForwardRefExoticComponent, ImgHTMLAttributes, RefAttributes } from "react";
import { Icon } from "@tabler/icons-react";

type IconProps = {
  name: string;
  size?: number;
} & ImgHTMLAttributes<HTMLImageElement>;

type IconType = ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

const TablerIcon = ({ name, size = 24, ...props }: IconProps) => {
  const variant = name.endsWith("-filled") ? "filled" : "outline";
  const iconName = name.replace(/(-filled|-outline)$/, "");
  return <img src={`/static/icons/${variant}/${iconName}.svg`} alt={iconName} width={size} height={size} {...props} />;
};

export default TablerIcon;
export type { IconProps, IconType };
