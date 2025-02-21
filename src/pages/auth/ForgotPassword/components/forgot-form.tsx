import { HTMLAttributes, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingButton } from "@/components/LoadingButton";

export type ForgotFormProps = HTMLAttributes<HTMLDivElement>;

const formSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("email"),
    account: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
  }),
  z.object({
    type: z.literal("phone"),
    account: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Invalid phone number format"),
  }),
]);

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      type: "email",
      account: "",
    },
  });

  const currentType = form.watch("type");

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recovery Method</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      // form.setValue("type", value as "email" | "phone");
                      form.resetField("account");
                    }}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a recovery method' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='email'>Email</SelectItem>
                      <SelectItem value='phone'>Phone</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='account'
              render={({ field }) => (
                <FormItem className='mt-4 space-y-1.5'>
                  <div className='flex items-center justify-between'>
                    <FormLabel className='text-sm font-medium'>
                      {currentType === "email" ? "Email" : "Phone Number"}
                    </FormLabel>
                    {/*{form.formState.errors.account && (*/}
                    {/*  <span className='text-xs text-muted-foreground'>*/}
                    {/*    {currentType === "email" ? "Enter valid email" : "10-digit number required"}*/}
                    {/*  </span>*/}
                    {/*)}*/}
                  </div>
                  <div className='relative rounded-lg border bg-background transition-colors focus-within:border-primary'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={currentType === "email" ? "name@example.com" : "13800138000"}
                        disabled={isLoading}
                        className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                      />
                    </FormControl>
                  </div>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <LoadingButton className='mt-2' loading={isLoading}>
              Continue
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
