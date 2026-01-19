import { useState, createContext, useContext, ReactNode } from "react";

// 1. Define a more specific context type
type CrudTableContextType<T> = {
  open: string | null;
  setOpen: (open: string | null) => void;
  currentRow: T | null;
  setCurrentRow: (row: T | null) => void;
};

// 2. Create the context with a specific generic type, but initialize with null
// We will check for null in the custom hook to ensure type safety.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CrudTableContext = createContext<CrudTableContextType<any> | null>(null);

// 3. Create a custom hook for consuming the context
export const useCrudTable = <T,>() => {
  const context = useContext(CrudTableContext as React.Context<CrudTableContextType<T> | null>);
  if (!context) {
    throw new Error("useCrudTable must be used within a CrudTableProvider");
  }
  return context;
};

// 4. The provider component remains largely the same but uses the correctly typed context
export function CrudTableProvider<T>({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<T | null>(null);

  const value = { open, setOpen, currentRow, setCurrentRow };

  return <CrudTableContext.Provider value={value}>{children}</CrudTableContext.Provider>;
}
