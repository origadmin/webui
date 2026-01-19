import React, { createContext, useContext, useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";


type TableDialogType =
  | "preview"
  | "invite"
  | "add"
  | "add-sub"
  | "edit"
  | "edit-permission"
  | "delete"
  | "resetPassword";

export interface TableContextType<T> {
  open: TableDialogType | null;
  setOpen: (str: TableDialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
  parentRow: T | null;
  setParentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

const createTableContext = <T,>() => {
  const defaultContextValue: TableContextType<T> = {
    open: null,
    setOpen: () => {},
    currentRow: null,
    setCurrentRow: () => {},
    parentRow: null,
    setParentRow: () => {},
  };

  const Context = createContext<TableContextType<T>>(defaultContextValue);

  const Provider = ({ children, ...props }: { children: React.ReactNode }) => {
    const [open, setOpen] = useDialogState<TableDialogType>(null);
    const [currentRow, setCurrentRow] = useState<T | null>(null);
    const [parentRow, setParentRow] = useState<T | null>(null);

    return (
      <Context.Provider
        value={{
          open,
          setOpen,
          currentRow,
          setCurrentRow,
          parentRow,
          setParentRow,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const useTable = () => {
    const context = useContext(Context);
    // The context is now guaranteed to be non-null.
    return context;
  };

  return { Provider, useTable };
};

export default createTableContext;
