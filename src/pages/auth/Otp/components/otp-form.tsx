import { Fragment, HTMLAttributes, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export type OtpFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.object({
  otp: z.string().min(1, { message: "Please enter your otp code." }),
});

export function OtpForm({ className, ...props }: OtpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log({ data });

    setTimeout(() => {
      form.reset();
      setIsLoading(false);
    }, 2000);
  }

  function genSlots(total: number, perGroup: number) {
    return Array.from({ length: Math.ceil(total / perGroup) }).map((_, groupIndex) => (
      <Fragment key={`group-${groupIndex}`}>
        <InputOTPGroup>
          {Array.from({ length: Math.min(perGroup, total - groupIndex * perGroup) }).map((_, slotIndex) => (
            <InputOTPSlot
              key={`slot-${groupIndex}-${slotIndex}`}
              index={groupIndex * perGroup + slotIndex}
              className={`${form.getFieldState("otp").invalid ? "border-red-500" : ""}`}
            />
          ))}
        </InputOTPGroup>
        {groupIndex < Math.ceil(total / perGroup) - 1 && <InputOTPSeparator key={`separator-${groupIndex}`} />}
      </Fragment>
    ));
  }

  const otpMax = 8;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem className='flex justify-center items-center'>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={otpMax}
                      className='flex h-12 w-12'
                      onChange={(e) => {
                        field.onChange(e);
                        if (!disabledBtn && e.length < otpMax) {
                          setDisabledBtn(true);
                        }
                      }}
                      onComplete={(args: string[]) => {
                        console.log("otp", args.length, args);
                        if (args.length === otpMax) {
                          setDisabledBtn(false);
                        }
                      }}
                      title='input-opt'
                      placeholder='input-opt'
                    >
                      {genSlots(otpMax, otpMax / 2)}
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={disabledBtn} loading={isLoading}>
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
