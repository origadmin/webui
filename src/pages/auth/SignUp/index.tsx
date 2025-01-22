import Background from "@/assets/static/background.jpg";
import { SignUpForm } from "@/pages/auth/SignUp/components/sign-up-form";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

function SignUp() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'
    >
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-4 flex items-center justify-center'>
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
          <h1 className='text-xl font-medium'>OrigAdmin</h1>
        </div>
        <Card className='p-6　inset-0 bg-zinc-900 bg-opacity-75'>
          <div className='mb-2 flex flex-col space-y-2 text-left'>
            <h1 className='text-lg font-semibold tracking-tight'>Create an account</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password to create an account. <br />
              Already have an account?{" "}
              <Link to='/sign-in' className='underline underline-offset-4 hover:text-primary'>
                Sign In
              </Link>
            </p>
          </div>
          <SignUpForm />
          <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            By creating an account, you agree to our{" "}
            <a href='/terms' className='underline underline-offset-4 hover:text-primary'>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href='/privacy' className='underline underline-offset-4 hover:text-primary'>
              Privacy Policy
            </a>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
