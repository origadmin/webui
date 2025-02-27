import React, { createContext, useContext, useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { OpenStateType } from "@/components/DataTable/row-actions";

type TableDialogType = "invite" | "add" | "add-sub" | "edit" | "delete";

interface TableContextType<T> {
  open: TableDialogType | null;
  setOpen: (str: TableDialogType | null) => void;
  currentRow: T | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>;
  parentRow: T | null;
  setParentRow: React.Dispatch<React.SetStateAction<T | null>>;
}

const createTableContext = <T,>() => {
  const Context = createContext<TableContextType<T> | null>(null);

  const Provider = ({ children, ...props }: { children: React.ReactNode }) => {
    const [open, setOpen] = useDialogState<OpenStateType>(null);
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
          ...props,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

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
