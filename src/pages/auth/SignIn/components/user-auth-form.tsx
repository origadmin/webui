import { HTMLAttributes, useState, useTransition } from "react";
import { signIn } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import { PasswordInput } from "@/components/password-input";
import { CaptchaDialog } from "./captcha-dialog";

export type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

// Schema for the main form (without captcha fields)
const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter your Email, Phone, or Username" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isCaptchaDialogOpen, setCaptchaDialogOpen] = useState(false);
  const [submitting, startTransition] = useTransition();
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const urlParams = new URLSearchParams(location.search);
  const redirectUrl = urlParams.get("redirect") || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    // By setting the mode to 'onSubmit' (or removing it, as it's the default),
    // validation will only run when the form is submitted or trigger() is called.
    mode: "onSubmit",
  });

  // This function will be called by the CaptchaDialog upon successful verification
  const handleLoginWithCaptcha = (captchaId: string, captchaCode: string) => {
    const values = form.getValues(); // Get the current username and password
    startTransition(async () => {
      try {
        const token = await signIn({
          ...values,
          captcha_id: captchaId,
          captcha_code: captchaCode,
        });
        await auth.login(token);
        toast({ description: "Signed In Successfully!" });
        navigate({ to: redirectUrl, replace: true });
      } catch (err) {
        toast({
          variant: "destructive",
          description: err instanceof Error ? err.message : "Login failed. Please try again.",
        });
        // Do not close the captcha dialog on login failure, allow user to retry captcha.
        // The dialog itself will handle captcha refresh on its own failed verification.
      }
    });
  };

  // This is the new handler for the Login button click.
  const handleLoginClick = async () => {
    // 1. Manually trigger validation for the fields we care about.
    const isValid = await form.trigger(["username", "password"]);

    // 2. If validation fails, do nothing. The UI will show error messages.
    if (!isValid) {
      return;
    }

    // 3. If validation passes, open the captcha dialog.
    setCaptchaDialogOpen(true);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        {/* The form tag is still useful for semantics and accessibility */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='grid gap-2 py-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Please enter Email, Phone, or Username...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link to='/forgot-password' className='text-sm font-medium text-muted-foreground hover:opacity-75'>
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type='button' // Changed from 'submit' to 'button'
              className='mt-2'
              loading={submitting}
              onClick={handleLoginClick} // Use the new click handler
            >
              Login
            </LoadingButton>
          </div>
        </form>
      </Form>
      <CaptchaDialog
        open={isCaptchaDialogOpen}
        onOpenChange={setCaptchaDialogOpen}
        onVerifySuccess={handleLoginWithCaptcha}
      />
    </div>
  );
}
