import { useRouter } from "@tanstack/react-router";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";

export default function NotFoundError(): React.ReactElement {
  const { navigate, history } = useRouter();
  return (
    <div className='h-svh'>
      <div className='m-auto flex size-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>
          <FormattedMessage id='pages.not_found.title' defaultMessage='Oops! Page Not Found!' />
        </span>
        <p className='text-center text-muted-foreground'>
          <FormattedMessage
            id='pages.not_found.sub_title'
            defaultMessage="It seems like the page you're looking for does not exist or might have been removed."
          />
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.back()} disabled={!history.canGoBack()}>
            <FormattedMessage id='pages.not_found.go_back' defaultMessage='Go Back' />
          </Button>
          <Button onClick={() => navigate({ to: "/", replace: true })}>
            <FormattedMessage id='pages.not_found.back_home' defaultMessage='Back to Home' />
          </Button>
        </div>
      </div>
    </div>
  );
}
