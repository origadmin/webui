import { createContext, useContext } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type FormProviderProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  children?: React.ReactNode;
};

type FormContextType<T extends FieldValues> = UseFormReturn<T> | null;

const Context = createContext<FormContextType<never>>(null);

const FormProvider = <T extends FieldValues>(props: FormProviderProps<T>) => {
  const { form, children } = props;

  return <Context.Provider value={form as unknown as FormContextType<never>}>{children}</Context.Provider>;
};

export const useForm = () => {
  const context = useContext(Context);
  if (!context) {
    return undefined;
  }
  return context;
};

export type { FormProviderProps };
export default FormProvider;
