import { useState, createContext, useContext, ReactNode } from "react";

type CrudTableContextType<T> = {
  open: string | null;
  setOpen: (open: string | null) => void;
  currentRow: T | null;
  setCurrentRow: (row: T | null) => void;
};

const CrudTableContext = createContext<CrudTableContextType<any> | undefined>(undefined);

export function CrudTableProvider<T>({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<T | null>(null);

  return (
    <CrudTableContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CrudTableContext.Provider>
  );
}

export const useCrudTable = <T,>() => {
  const context = useContext<CrudTableContextType<T> | undefined>(CrudTableContext);
  if (context === undefined) {
    throw new Error("useCrudTable must be used within a CrudTableProvider");
  }
  return context;
};
