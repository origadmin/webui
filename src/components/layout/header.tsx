import ThemeSwitch from '@/components/layout/Theme/theme-switch';
import React from 'react';

import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { NavUser } from './nav-user';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <NavUser
          {...{
            user: {
              name: 'John Doe',
              email: 'john@doe.com',
              avatar: 'https://avatars.githubusercontent.com/u/10214304?v=4',
            },
          }}
        />
        <ThemeSwitch />
      </div>
    </header>
  );
}
