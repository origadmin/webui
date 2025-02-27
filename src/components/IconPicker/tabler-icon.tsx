import { useEffect, useState, ComponentType, RefAttributes, SVGProps } from "react";
import { dynamicImports } from "@tabler/icons-react";

type IconCache = Record<string, ComponentType<any>>;
const iconCache: IconCache = {};
// type SVGElementType = "circle" | "ellipse" | "g" | "line" | "path" | "polygon" | "polyline" | "rect";
// type IconNode = [elementName: keyof SVGElementType, attrs: Record<string, string>][];
// interface BaseTablerIconProps extends Partial<Omit<ComponentPropsWithoutRef<"svg">, "stroke">> {
//   size?: string | number;
//   stroke?: string | number;
//   title?: string;
// }
// type Icon = FunctionComponent<BaseTablerIconProps>;
// type BaseTablerIcon = ForwardRefExoticComponent<Omit<BaseTablerIconProps, "ref"> & RefAttributes<Icon>> &
//   RefAttributes<SVGSVGElement>;
type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;

type TablerIconProps = {
  name: string;
} & RefAttributes<SVGSVGElement> &
  SVGAttributes;

const TablerIcon = ({ name, ...props }: TablerIconProps) => {
  const [IconComponent, setIconComponent] = useState<ComponentType<any> | null>(iconCache[name] || null);

  useEffect(() => {
    const loadIcon = async () => {
      if (!iconCache[name]) {
        try {
          const icon = name as keyof typeof dynamicImports.default;
          const { default: Icon } = await dynamicImports.default[icon]();
          iconCache[name] = Icon;
          setIconComponent(() => Icon);
        } catch (error) {
          console.error(`Icon "${name}" not found!`, error);
        }
      } else {
        setIconComponent(() => iconCache[name]);
      }
    };

    loadIcon().finally();
  }, [name]);

  if (!IconComponent) return null;

  return <IconComponent placeholder={name} {...props} />;
};

export default TablerIcon;
