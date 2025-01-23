import { HTMLAttributes, useCallback, useEffect, useState, useTransition } from "react";
import Placeholder from "@/assets/static/placeholder.jpg";
import { mockToken } from "@/mocks/mockSidebar";
import { fetchRequest } from "@/utils/service";
import { setAuth } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandFacebook, IconBrandGithub } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/Loading";
import { Button } from "@/components/custom/button";
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

const signIn = async (param: SignInProps): Promise<API.Result<any>> => {
  return new Promise((resolve, reject) => {
    console.log("param:", param);
    if (!param.values) {
      reject(new Error("Require login data is empty"));
      return;
    }
    console.log("param value:", param);
    if (param.values.username !== "admin") {
      reject(new Error("Invalid username or password"));
      return;
    }
    if (param.values.password !== "adminadmin") {
      reject(new Error("Invalid username or password"));
      return;
    }
    setTimeout(() => {
      // 模拟登录成功
      const token = mockToken;
      if (token) {
        // Storage.setUserID(token.user_id);
        // Storage.setAccessToken(token.access_token);
        // const time = new Date().setTime(token.expires_at);
        // Storage.setExpirationTime(time.toString());
        // 登录成功后，跳转到 callbackUrl
        // window.location.href = param.callbackUrl;
        resolve({ success: true, data: token });
      } else {
        reject(new Error("Email is required"));
      }
    }, 1000); // 等待 3 秒
  });
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [captcha, setCaptcha] = useState<Captcha>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, startTransition] = useTransition();
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get("redirect") || "/";
  const navigate = useNavigate();

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
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const reload = captcha.id ? `id=${captcha.id}&reload=true` : "";
    const url = reload !== "" ? `/api/v1/captcha?${reload}` : "/api/v1/captcha";
    try {
      const response = await fetchRequest<Captcha>(url, "GET");
      if (response.success && response.data) {
        setCaptcha({ ...response.data });
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
      try {
        const result = await signIn({
          values: values,
          callbackUrl: redirectUrl,
        });
        if (result && result.success) {
          toast({
            description: "Signed In Successfully!",
          });
          setAuth(result.data);
        }

        // console.log("location", location.pathname, redirectUrl);
        navigate(redirectUrl, { replace: true });
        // window.location.href = redirectUrl;
      } catch (err) {
        const myerr = err as Error;
        console.error("SignIn Err:", myerr);
        toast({
          variant: "destructive",
          description: myerr && myerr.message ? myerr.message : "unknown error",
        });
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
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
                      {isLoading ? (
                        <Skeleton className='h-10 w-[120px] flex flex-1 items-center justify-center'>
                          <LoadingSpinner />
                        </Skeleton>
                      ) : (
                        <img
                          src={captcha.data || Placeholder}
                          alt='CAPTCHA'
                          className='h-10 w-[120px] cursor-pointer flex flex-1 rounded-md items-center justify-center'
                          onClick={refreshCaptcha}
                          aria-label='Click to refresh CAPTCHA'
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='mt-2' loading={submitting}>
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={submitting}
                leftSection={<IconBrandGithub className='size-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={submitting}
                leftSection={<IconBrandFacebook className='size-4' />}
              >
                Facebook
              </Button>
            </div>
            <div className='grid gap-2'>
              <div className='text-center text-sm'>
                Don&apos;t have an account? {/*<a href="#" className="underline underline-offset-4">*/}
                {/*  Sign up*/}
                {/*</a>*/}
                <Link to='#' className='text-sm font-medium text-muted-foreground hover:opacity-75'>
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
