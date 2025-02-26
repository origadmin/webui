import { useEffect, useState, ComponentType } from "react";
import { dynamicImports } from "@tabler/icons-react";

type IconCache = Record<string, ComponentType<any>>;
const iconCache: IconCache = {};

type TablerIconProps = {
  name: string;
} & Record<string, unknown>;

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
