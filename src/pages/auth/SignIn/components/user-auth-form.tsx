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
    mode: "onSubmit",
  });

  const handleLoginWithCaptcha = (captchaId: string, captchaCode: string) => {
    console.log("[UserAuthForm] handleLoginWithCaptcha called with:", { captchaId, captchaCode });
    const values = form.getValues();
    startTransition(async () => {
      try {
        console.log("[UserAuthForm] Submitting with:", { ...values, captchaId, captchaCode });
        const token = await signIn({
          ...values,
          captcha_id: captchaId,
          captcha_code: captchaCode,
        });
        await auth.login(token);
        toast({ description: "Signed In Successfully!", duration: 1000 });
        setCaptchaDialogOpen(false);
        navigate({ to: redirectUrl, replace: true });
      } catch (err) {
        console.error("[UserAuthForm] SignIn Error:", err);
        toast({
          variant: "destructive",
          description: err instanceof Error ? err.message : "Login failed. Please try again.",
        });
      }
    });
  };

  const handleLoginClick = async () => {
    console.log("[UserAuthForm] handleLoginClick called");
    const isValid = await form.trigger(["username", "password"]);
    console.log("[UserAuthForm] Form validation result:", isValid);
    if (!isValid) {
      return;
    }
    setCaptchaDialogOpen(true);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
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
            <LoadingButton type='button' className='mt-2' loading={submitting} onClick={handleLoginClick}>
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
