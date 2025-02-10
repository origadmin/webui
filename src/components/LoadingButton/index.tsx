import { forwardRef, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { IconLoader2 } from "@tabler/icons-react";
import { ButtonProps as ButtonPropsBase, Button as ButtonBase } from "@/components/ui/button";

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false;
        loading?: boolean;
        leftSection?: ReactNode;
        rightSection?: ReactNode;
      }
  );

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, ...props }, ref) => {
  const { asChild, ...rest } = props;
  if (asChild) {
    return (
      <Slot {...{ variant, size, className }} ref={ref} {...rest}>
        {children}
      </Slot>
    );
  }
  const { leftSection, rightSection, loading, disabled, ...baseProps } = props;
  const Comp = asChild ? Slot : ButtonBase;
  return (
    <Comp {...{ variant, size, className }} disabled={loading || disabled} ref={ref} {...baseProps}>
      {((leftSection && loading) || (!leftSection && !rightSection && loading)) && (
        <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
      )}
      {!loading && leftSection && <div className='mr-2'>{leftSection}</div>}
      {children}
      {!loading && rightSection && <div className='ml-2'>{rightSection}</div>}
      {rightSection && loading && <IconLoader2 className='ml-2 h-4 w-4 animate-spin' />}
    </Comp>
  );
});
Button.displayName = "Button";

export { Button as LoadingButton };
