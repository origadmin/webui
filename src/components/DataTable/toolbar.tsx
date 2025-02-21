import { JSX } from "react";

export type ToolbarProps = {
  toolbars?: JSX.Element;
  toolbarRender?: () => JSX.Element;
};
