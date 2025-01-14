import { Icons } from '@/components/icons';
import { API } from '@/types/typings';

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

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const menuItems: API.MenuItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: Icons['dashboard'],
    isActive: false,
    shortcut: ['d', 'd'],
    items: [], // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: Icons['product'],
    shortcut: ['p', 'p'],
    isActive: false,
    items: [], // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: Icons['billing'],
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: Icons['userPen'],
        shortcut: ['m', 'm'],
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: Icons['login'],
      },
    ],
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: Icons['kanban'],
    shortcut: ['k', 'k'],
    isActive: false,
    items: [], // No child items
  },
];

