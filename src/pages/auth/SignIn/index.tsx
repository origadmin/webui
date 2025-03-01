// import Background from "@/assets/static/background.jpg";
import { UserAuthForm } from "./components/user-auth-form";
import "./index.css";

function SignInPage() {
  return (
    <>
      <div className='container background relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col p-10 lg:flex dark:border-r'>
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 size-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            OrigAdmin WebUI
          </div>

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;This library has revolutionized my workflow, saving time and <br />
                allowing me to deliver stunning designs at lightning speed. It <br />
                enhances efficiency and brings unmatched creativity and quality <br />
                to my work. There's truly no substitute for this tool! &rdquo;
              </p>
              <footer className='text-sm'>Lu Xun</footer>
            </blockquote>
          </div>
        </div>
        <div className='relative flex h-full items-center justify-center lg:p-8'>
          <div className='absolute inset-0 bg-zinc-900 bg-opacity-75' />
          <div className='relative z-20 mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below to log into your account
              </p>
            </div>
            <UserAuthForm />
            <br />
            <footer className='px-8 text-center text-sm text-muted-foreground mt-auto'>
              {/*<p className='px-8 text-center text-sm text-muted-foreground'>*/}
              By clicking login, you agree to our{" "}
              <a href='/terms' className='underline underline-offset-4 hover:text-primary'>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href='/privacy' className='underline underline-offset-4 hover:text-primary'>
                Privacy Policy
              </a>
              .{/*</p>*/}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
