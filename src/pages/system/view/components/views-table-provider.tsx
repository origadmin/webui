import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// --- Type Definitions ---

// Defines the shape of the context for view-specific data.
interface ViewContextType {
  sidebarRootId: string | null;
  setSidebarRootId: (id: string | null) => void;
}

// Defines the shape of the context for table operations (dialogs, selections).
interface ViewTableContextType {
  open: string | null;
  setOpen: Dispatch<SetStateAction<string | null>>;
  currentRow: API.System.View | null;
  setCurrentRow: Dispatch<SetStateAction<API.System.View | null>>;
  parentRow: API.System.View | null;
  setParentRow: Dispatch<SetStateAction<API.System.View | null>>;
}

// --- Context Creation ---

const ViewContext = createContext<ViewContextType | undefined>(undefined);
const ViewTableContext = createContext<ViewTableContextType | undefined>(undefined);

// --- Custom Hooks ---

/**
 * Hook to access view-specific context (e.g., sidebar root ID).
 */
export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useViewContext must be used within a ViewTableProvider");
  }
  return context;
};

/**
 * Hook to access table operations context (dialogs, selections).
 * This provides a type-safe way to manage the state of the view table.
 */
export const useViewTable = () => {
  const context = useContext(ViewTableContext);
  if (!context) {
    throw new Error("useViewTable must be used within a ViewTableProvider");
  }
  return context;
};

// --- Combined Provider Component ---

/**
 * Provides both view-specific and table operation contexts to its children.
 * This component should wrap any part of the application that needs access to the view management state.
 */
export const ViewTableProvider = ({ children }: { children: ReactNode }) => {
  // State for view-specific data
  const [sidebarRootId, setSidebarRootId] = useState<string | null>(null);

  // State for table operations
  const [open, setOpen] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<API.System.View | null>(null);
  const [parentRow, setParentRow] = useState<API.System.View | null>(null);

  const viewContextValue: ViewContextType = { sidebarRootId, setSidebarRootId };
  const viewTableContextValue: ViewTableContextType = {
    open,
    setOpen,
    currentRow,
    setCurrentRow,
    parentRow,
    setParentRow,
  };

  return (
    <ViewContext.Provider value={viewContextValue}>
      <ViewTableContext.Provider value={viewTableContextValue}>{children}</ViewTableContext.Provider>
    </ViewContext.Provider>
  );
};
