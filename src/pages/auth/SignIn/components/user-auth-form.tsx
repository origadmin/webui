import { HTMLAttributes, useCallback, useEffect, useState, useTransition } from "react";
import Placeholder from "@/assets/static/placeholder.jpg";
import { signIn } from "@/utils/auth";
import { get } from "@/utils/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
// Import useAuth
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "@/components/Image";
import { LoadingButton } from "@/components/LoadingButton";
import { PasswordInput } from "@/components/password-input";

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
  captcha_id: z.string(),
  captcha_code: z.string().length(4, { message: "Invalid captcha code" }),
});

export type Captcha = {
  id?: string;
  data?: string;
};

const defaultCaptcha: Captcha = {
  id: undefined,
  data: Placeholder,
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [captcha, setCaptcha] = useState<Captcha>(defaultCaptcha);
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, startTransition] = useTransition();
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = useAuth(); // Get the auth context
  const urlParams = new URLSearchParams(location.search);
  const redirectUrl = urlParams.get("redirect") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      captcha_id: captcha.id || "",
      captcha_code: "",
    },
  });

  const refreshCaptcha = useCallback(async () => {
    if (submitting || isLoading) return;
    setIsLoading(true);
    const url = `/captcha${captcha.id ? `?id=${captcha.id}&reload=true` : ""}`;
    try {
      const response = await get<Captcha>(url);
      if (response.success && response.data) {
        setCaptcha(response.data);
      }
    } catch (err) {
      console.error("Captcha Err:", err);
    } finally {
      setIsLoading(false);
    }
  }, [submitting, isLoading, captcha.id]);

  useEffect(() => {
    if (isLoading) return;
    refreshCaptcha();
  }, [isLoading]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.captcha_id = captcha.id || "";
    startTransition(async () => {
      try {
        // 1. Call the simplified signIn function to get the token
        const token = await signIn(values);

        // 2. Call the login method from the auth context
        await auth.login(token);

        toast({ description: "Signed In Successfully!" });

        // 3. Navigate to the redirect URL
        navigate({ to: redirectUrl, replace: true });
      } catch (err) {
        console.error("SignIn Err:", err);
        refreshCaptcha(); // Refresh captcha on error
        toast({
          variant: "destructive",
          description: err instanceof Error ? err.message : "Unknown error",
        });
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='captcha_code'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <Label htmlFor='captcha_code'>CAPTCHA</Label>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Input className='flex-1' id='captcha_code' placeholder='Enter CAPTCHA' {...field} required />
                      </FormControl>
                      <Image
                        isLoading={isLoading}
                        src={captcha.data || Placeholder}
                        alt='CAPTCHA'
                        className='w-[120px]'
                        size='sm'
                        onClick={refreshCaptcha}
                        label='Click to refresh CAPTCHA'
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton type='submit' className='mt-2' loading={submitting}>
              Login
            </LoadingButton>
            {/* ... other elements */}
          </div>
        </form>
      </Form>
    </div>
  );
}
