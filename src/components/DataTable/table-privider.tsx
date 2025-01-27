import React, { createContext, useContext } from "react";

type TableDialogType = "invite" | "add" | "edit" | "delete";

interface TableContextType<T> {
  open: TableDialogType | null;
  setOpen: (str: TableDialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

const createTableContext = <T,>() => {
  const Context = createContext<TableContextType<T> | null>(null);

  const Provider = ({ children, ...props }: { children: React.ReactNode } & TableContextType<T>) => (
    <Context.Provider value={props}>{children}</Context.Provider>
  );

  const useTable = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useTable has to be used within <TableProvider>");
    }
    return context;
  };

  return { Provider, useTable };
};

export default createTableContext;
