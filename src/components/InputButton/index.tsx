import { ElementType, MouseEventHandler } from "react";
import { IconArrowsSort } from "@tabler/icons-react";
import { FieldValues, FieldPath, ControllerRenderProps } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InputButtonProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  icon?: ElementType;
  placeholder?: string;
  field?: ControllerRenderProps<TFieldValues, TName>;
  onClick?: MouseEventHandler<TFieldValues> | undefined;
}

const InputButton = ({ field, onClick, icon, placeholder }: InputButtonProps) => {
  const IconComponent = icon ? icon : IconArrowsSort;
  return (
    <>
      <Input
        className='rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        placeholder={placeholder}
        {...field}
      />
      <Button
        type='button'
        variant='outline'
        onClick={onClick}
        className='h-9 w-12 gap-0 px-0 rounded-l-none'
        size='icon'
      >
        <IconComponent className='h-5 w-5' />
      </Button>
    </>
  );
};

export default InputButton;
export type { InputButtonProps };
