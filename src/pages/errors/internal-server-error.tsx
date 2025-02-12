import { HTMLAttributes } from "react";
import { useRouter } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface InternalServerErrorProps extends HTMLAttributes<HTMLDivElement> {
  minimal?: boolean;
}

export default function InternalServerError({ className, minimal }: InternalServerErrorProps) {
  const { navigate, history } = useRouter();
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className='m-auto flex size-full flex-col items-center justify-center gap-2'>
        {!minimal && <h1 className='text-[7rem] font-bold leading-tight'>500</h1>}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.back()} disabled={history.canGoBack()}>
              Go Back
            </Button>
            <Button onClick={() => navigate({ to: "/", replace: true })}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
