import { SVGProps as BaseSVGProps } from "react";

type SVGProps = {
  name: string;
  size?: number;
} & BaseSVGProps<SVGSVGElement>;

const TablerIcon = ({ name, size = 24, ...props }: SVGProps) => {
  const filled = name.startsWith("filled-") ? "filled" : "outline";
  const iconName = name.replace(/^(filled-|outline-)/, "");
  return (
    <svg width={size} height={size} {...props}>
      <use xlinkHref={`/public/static/icons/${filled}/${iconName}.svg#tabler-activity`} />
    </svg>
  );
};

export default TablerIcon;
