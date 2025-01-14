import { API } from '@/types/typings';
import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react';
import { Command } from 'lucide-react';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const data: API.SidebarData = {
  user: {
    name: 'OrigAdmin',
    email: 'origadminpanelwebui@gmail.com',
    avatar: '/static/logo.svg',
  },
  teams: [
    {
      name: 'OrigAdmin Panel',
      logo: Command,
      plan: 'React + ShadcnUI',
    },
  ],
  menuItems: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: IconLayoutDashboard,
          isActive: false,
          shortcut: ['d', 'd'],
        },
        {
          title: 'Monitor',
          url: '/monitor',
          icon: IconMessages,
          shortcut: ['m', 'm'],
          isActive: false,
        },
        {
          title: 'Notifications',
          url: '/notifications',
          icon: IconNotification,
          shortcut: ['n', 'n'],
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
          shortcut: ['t', 't'],
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: IconPackages,
          shortcut: ['a', 'a'],
        },
        {
          title: 'Chats',
          url: '/chats',
          icon: IconMessages,
          shortcut: ['c', 'c'],
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
          shortcut: ['u', 'u'],
        },
      ],
    },
    {
      title: 'Examples',
      items: [
        {
          title: 'Form',
          icon: IconHelp,
          items: [
            {
              title: 'Advanced',
              url: '/examples/form/advanced',
              icon: IconHelp,
            },
            {
              title: 'Basic',
              url: '/examples/form/basic',
              icon: IconHelp,
            },
            {
              title: 'Simple',
              url: '/examples/form/simple',
              icon: IconHelp,
            },
          ],
        },
        {
          title: 'List',
          url: '/examples/list',
          icon: IconHelp,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
};

export const topNav: API.TopNav[] = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
  },
];
