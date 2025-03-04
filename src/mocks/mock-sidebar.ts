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
  icons,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
} from "@tabler/icons-react";
import { Command, LifeBuoy, Send } from "lucide-react";
import { uuid } from "@/lib/crypto";

export type Product = {
  photo_path: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const mockSidebar: API.SidebarData = {
  user: {
    name: "OrigAdmin",
    email: "origadminpanelwebui@gmail.com",
    avatar: "/static/logo.svg",
  },
  teams: [
    {
      name: "OrigAdmin WebUI",
      logo: Command,
      plan: "React + ShadcnUI",
    },
  ],
  menuItems: [
    {
      title: "General",
      children: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: IconLayoutDashboard,
          isActive: false,
          shortcut: ["d", "d"],
          children: [
            {
              title: "Overview",
              path: "/dashboard/overview",
              icon: IconLayoutDashboard,
              shortcut: ["o", "o"],
              isActive: false,
            },
            {
              title: "Monitor",
              path: "/dashboard/monitor",
              icon: IconMessages,
              shortcut: ["m", "m"],
              isActive: false,
            },
            {
              keyword: "dashboard:settings",
              title: "Settings",
              icon: IconSettings,
              shortcut: ["s", "s"],
              isActive: false,
            },
          ],
        },
        {
          title: "Tasks",
          path: "/tasks",
          icon: IconChecklist,
          shortcut: ["t", "t"],
        },
        {
          title: "Apps",
          path: "/apps",
          icon: IconPackages,
          shortcut: ["a", "a"],
        },
        {
          title: "Chats",
          path: "/chats",
          icon: IconMessages,
          shortcut: ["c", "c"],
        },
      ],
    },
    {
      title: "Settings",
      children: [
        {
          title: "System",
          icon: IconServerOff,
          children: [
            {
              title: "Resource",
              path: "/system/resource",
              icon: icons["IconDatabase"],
              shortcut: ["r", "r"],
            },
            {
              title: "Roles",
              path: "/system/role",
              icon: icons["IconShield"],
              shortcut: ["r", "r"],
            },
            {
              title: "Users",
              path: "/system/user",
              icon: icons["IconUsers"],
              shortcut: ["u", "u"],
            },
            {
              title: "Settings",
              path: "/system/settings",
              icon: icons["IconSettings"],
              shortcut: ["s", "s"],
            },
          ],
        },
      ],
    },
    {
      title: "Examples",
      children: [
        {
          title: "Form",
          icon: IconHelp,
          children: [
            {
              title: "Advanced",
              path: "/examples/form/advanced",
              icon: IconHelp,
            },
            {
              title: "Basic",
              path: "/examples/form/basic",
              icon: IconHelp,
            },
            {
              title: "Simple",
              path: "/examples/form/simple",
              icon: IconHelp,
            },
          ],
        },
        {
          title: "List",
          path: "/examples/list",
          icon: IconHelp,
        },
      ],
    },
    {
      title: "Pages",
      children: [
        {
          title: "Auth",
          icon: IconLockAccess,
          children: [
            {
              title: "Sign In",
              path: "/sign-in",
            },
            {
              title: "Sign In (2 Col)",
              path: "/sign-in-2",
            },
            {
              title: "Sign Up",
              path: "/sign-up",
            },
            {
              title: "Forgot Password",
              path: "/forgot-password",
            },
            {
              title: "OTP",
              path: "/otp",
            },
          ],
        },
        {
          title: "Errors",
          icon: IconBug,
          children: [
            {
              title: "Unauthorized",
              path: "/401",
              icon: IconLock,
            },
            {
              title: "Forbidden",
              path: "/403",
              icon: IconUserOff,
            },
            {
              title: "Not Found",
              path: "/404",
              icon: IconError404,
            },
            {
              title: "Internal Server Error",
              path: "/500",
              icon: IconServerOff,
            },
            {
              title: "Maintenance Error",
              path: "/503",
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      children: [
        {
          title: "Settings",
          icon: IconSettings,
          children: [
            {
              title: "Profile",
              path: "/settings",
              icon: IconUserCog,
            },
            {
              title: "Account",
              path: "/settings/account",
              icon: IconTool,
            },
            {
              title: "Appearance",
              path: "/settings/appearance",
              icon: IconPalette,
            },
            {
              title: "Notifications",
              path: "/settings/notifications",
              icon: IconNotification,
            },
            {
              title: "Display",
              path: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: "Help Center",
          path: "/help-center",
          icon: IconHelp,
        },
      ],
    },
  ],
};

export const mockTopNav = [
  {
    title: "Overview",
    href: "/dashboard/overview",
    isActive: false,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    isActive: false,
  },
];

export const mockFooter = [
  {
    key: uuid(),
    title: "FAQs",
    url: "#",
    links: [
      {
        key: uuid(),
        title: "Terms",
        url: "#",
      },
      {
        key: uuid(),
        title: "Disclaimer",
        url: "#",
      },
    ],
  },
  {
    key: uuid(),
    title: "Privacy Policy",
    url: "#",
    links: [
      {
        key: uuid(),
        title: "General",
        url: "#",
      },
      {
        key: uuid(),
        title: "Privacy",
        url: "#",
      },
    ],
  },
  {
    key: uuid(),
    title: "Terms & Conditions",
    url: "#",
    links: [
      {
        key: uuid(),
        title: "General",
        url: "#",
      },
      {
        key: uuid(),
        title: "Privacy",
        url: "#",
      },
    ],
  },
  {
    key: uuid(),
    title: "Refund Policy",
    url: "#",
    links: [
      {
        key: uuid(),
        title: "General",
        url: "#",
      },
      {
        key: uuid(),
        title: "Privacy",
        url: "#",
      },
    ],
  },
];

export const mockUsers = [
  {
    username: "admin",
    nickname: "超级管理员",
    password: "123456",
    email: "admin@example.com",
    phone: "13800138000",
    status: 1,
    // roles: ["super_admin"],
    // departments: ["root"],
    // positions: ["技术总监"],
    is_system: true,
  },
  {
    username: "test",
    nickname: "测试用户",
    password: "123456",
    email: "test@example.com",
    phone: "13800138001",
    status: 1,
    // roles: ["user"],
    // departments: ["dev"],
    // positions: ["高级开发工程师"],
  },
];

export const mockUser = {
  id: "1",
  username: "admin",
  nickname: "超级管理员",
  password: "123456",
  email: "admin@example.com",
  phone: "13800138000",
  status: 1,
  is_system: true,
};

export const mockSecondItems = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];
