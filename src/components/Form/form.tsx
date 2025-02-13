import { noop } from "@/utils";
import { FieldValues, useForm } from "react-hook-form";
import FormProvider from "@/hooks/use-form";
import { Form as BaseForm } from "@/components/ui/form";

type FormProps<T> = {
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
};
const FormBak = <T extends FieldValues>(props: FormProps<T>) => {
  const { onSubmit = noop, children } = props;
  const form = useForm<T>();

  return (
    <FormProvider form={form}>
      <BaseForm {...form}>
        <form id='user-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-1'>
          {children}
        </form>
      </BaseForm>
    </FormProvider>
  );
};

// const FormFieldBack = () => {};

export { FormBak };
