import { createContext, useContext } from "react";

interface ModelContextType {
  // permissions: API.Permission[];
  menus?: API.Menu[];
  // addPermission: (permission: API.Permission) => void;
  // updatePermission: (id: string, permission: Partial<API.Permission>) => void;
  // deletePermission: (id: string) => void;
  addMenu?: (menu: API.Menu) => void;
  updateMenu?: (id: string, menu: Partial<API.Menu>) => void;
  deleteMenu?: (id: string) => void;
}

class Dispatcher {
  callbacks: Record<string, Set<Function>> = {};
  data: Record<string, unknown> = {};
  update = (name: string) => {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => {
        try {
          const data = this.data[name];
          cb(data);
        } catch (e) {
          console.error(e);
          cb(undefined);
        }
      });
    }
  };
}

const ModelContext = createContext<ModelContextType>({
  addMenu: () => {},
  updateMenu: () => {},
  deleteMenu: () => {},
});

export const useModel = () => {
  const model = useContext(ModelContext);
  if (!model) {
    throw new Error("useModel must be used within a ModelContextProvider");
  }
  return model;
};

const dispatcher = new Dispatcher();

interface ProviderProps {
  value: unknown;
}

export function Provider(props: { models: Record<string, string>; children: React.ReactNode }) {
  return (
    // <ModelContext.Provider value={{ dispatcher }}>
    //   {Object.keys(props.models).map((name) => {
    //     return (
    //       <Executor
    //         key={name}
    //         hook={props.models[name]}
    //         name={name}
    //         onUpdate={(val) => {
    //           dispatcher.data[name] = val;
    //           dispatcher.update(name);
    //         }}
    //       />
    //     );
    //   })}
    <ModelContext.Provider value={{}}>{props.children}</ModelContext.Provider>
  );
}
