import { Fragment, JSX } from "react";
import { Table } from "@tanstack/react-table";

type ExternalType = JSX.Element | JSX.Element[] | (() => JSX.Element[]) | false;

export type ToolbarProps<TData> = {
  table?: Table<TData>;
  children?: JSX.Element;
  render?: (table: Table<TData>) => JSX.Element;
  externalAlign?: "left" | "right";
  external?: ExternalType;
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
