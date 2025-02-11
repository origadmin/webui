import { HTMLAttributes, useCallback, useEffect, useState, useTransition } from "react";
import Placeholder from "@/assets/static/placeholder.jpg";
import { signIn } from "@/utils/auth";
import { get } from "@/utils/request";
import { setAuth } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandFacebook, IconBrandGithub } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
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
export type LoginFormValue = {
  username: string;
  password: string;
  captcha_id: string;
  captcha_code: string;
};
export type SignInProps = {
  values?: LoginFormValue;
  callbackUrl: string;
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
  const urlParams = new URLSearchParams(window.location.search);
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
    // Avoid refreshing the CAPTCHA when submitting a login form
    if (submitting || isLoading) {
      return;
    }
    setIsLoading(true);
    // Simulate API call to get new CAPTCHA

    // const reload = captcha.id ? `id=${captcha.id}&reload=true` : "";
    // const url = reload !== "" ? `/api/v1/captcha?${reload}` : "/api/v1/captcha";
    // =>
    const url = `/captcha${captcha.id ? `?id=${captcha.id}&reload=true` : ""}`;

    try {
      const response = await get<Captcha>(url);
      if (response.success && response.data) {
        setCaptcha({
          id: response.data.id,
          data: response.data.data,
        });
      } else {
        console.error("Failed to refresh captcha:", response);
      }
    } catch (err) {
      console.error("Captcha Err:", err);
    } finally {
      setIsLoading(false);
    }
  }, [submitting, isLoading, captcha.id]);

  useEffect(() => {
    // Avoid refreshing the CAPTCHA when submitting a login form
    if (isLoading) {
      return;
    }
    console.log("refresh captcha");
    refreshCaptcha();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    values.captcha_id = captcha.id || "";
    console.log("form data:", values);
    startTransition(async () => {
      await signIn<API.Token>(values, {
        redirectUrl: redirectUrl,
        onSuccess: (data) => {
          toast({
            description: "Signed In Successfully!",
          });
          if (data) {
            setAuth(data);
          }
          console.log("location", location.pathname, redirectUrl);
          window.location.href = redirectUrl;
        },
        onError: (err) => {
          console.error("SignIn Err:", err);
          toast({
            variant: "destructive",
            description: err && err.message ? err.message : "unknown error",
          });
        },
      });
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

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <LoadingButton
                variant='outline'
                className='w-full'
                type='button'
                loading={submitting}
                leftSection={<IconBrandGithub className='size-4' />}
              >
                GitHub
              </LoadingButton>
              <LoadingButton
                variant='outline'
                className='w-full'
                type='button'
                loading={submitting}
                leftSection={<IconBrandFacebook className='size-4' />}
              >
                Facebook
              </LoadingButton>
            </div>
            <div className='grid gap-2'>
              <div className='text-center text-sm'>
                Don&apos;t have an account? {/*<a href="#" className="underline underline-offset-4">*/}
                {/*  Sign up*/}
                {/*</a>*/}
                <Link className='text-sm font-medium text-muted-foreground hover:opacity-75' to={"/"}>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
