import { Fragment, JSX, ReactNode } from "react";
import { Table } from "@tanstack/react-table";

type ExternalType = JSX.Element | JSX.Element[] | ((prev?: JSX.Element[]) => JSX.Element[]) | false;

export type ToolbarProps<TData> = {
  table?: Table<TData>;
  children?: JSX.Element;
  render?: (table: Table<TData>) => JSX.Element;
  externalAlign?: "left" | "right";
  external?: ExternalType;
  position?: "top" | "bottom";
  leftActions?: (table: Table<TData>) => ReactNode[];
  rightActions?: (table: Table<TData>) => ReactNode[];
};

export function Toolbar<TData>({ table, children, render, externalAlign = "right", external }: ToolbarProps<TData>) {
  const toolbar = children || (render && table && render(table));
  const externalElement = (external: ExternalType) => {
    const element = typeof external === "function" ? external() : external;
    return Array.isArray(element) ? element : [element];
  };

  const elements = (external && externalElement(external)) || [];
  const toolbars = toolbar ? [toolbar] : [];
  const items = externalAlign === "left" ? [...elements, ...toolbars] : [...toolbars, ...elements];
  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2'>
        {items.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </div>
    </div>
  );
}
