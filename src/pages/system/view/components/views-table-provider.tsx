import { createContext, useContext, useState } from "react";
import { API } from "@/api";
import createTableContext from "@/components/DataTable/table-privider";


// --- Generic Table Context ---
const { Provider: TableProvider, useTable } = createTableContext<API.System.View>();

// --- View-Specific Context ---
interface ViewContextType {
  sidebarRootId: string | null;
  setSidebarRootId: (id: string | null) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewContext must be used within a ViewTableProvider");
  }
  return context;
};

// --- Combined Provider ---
export const ViewTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarRootId, setSidebarRootId] = useState<string | null>(null);

  return (
    <ViewContext.Provider value={{ sidebarRootId, setSidebarRootId }}>
      <TableProvider>{children}</TableProvider>
    </ViewContext.Provider>
  );
};

export { useTable as useViewTable };
