import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { API } from '@/types/typings';
import { IconMenu } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Button } from './custom/button';

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  navs?: API.TopNav[];
}

export function TopNav({ className, navs, ...props }: TopNavProps) {
  return (
    <>
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' variant='outline'>
              <IconMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom' align='start'>
            {navs?.map(({ title, href, isActive }) => (
              <DropdownMenuItem key={`${title}-${href}`} asChild>
                <Link to={href} className={!isActive ? 'text-muted-foreground' : ''}>
                  {title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className={cn('hidden items-center space-x-4 md:flex lg:space-x-6', className)} {...props}>
        {navs?.map(({ title, href, isActive }) => (
          <Link
            key={`${title}-${href}`}
            to={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
}
