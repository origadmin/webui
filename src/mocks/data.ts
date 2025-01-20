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
} from "@tabler/icons-react";
import { Command, LifeBuoy, Send } from "lucide-react";
import { API } from "@/types/typings";

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

export const data: API.SidebarData = {
  user: {
    name: "OrigAdmin",
    email: "origadminpanelwebui@gmail.com",
    avatar: "/static/logo.svg",
  },
  teams: [
    {
      name: "OrigAdmin Panel",
      logo: Command,
      plan: "React + ShadcnUI",
    },
  ],
  menuItems: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: IconLayoutDashboard,
          isActive: false,
          shortcut: ["d", "d"],
        },
        {
          title: "Monitor",
          path: "/monitor",
          icon: IconMessages,
          shortcut: ["m", "m"],
          isActive: false,
        },
        {
          title: "Notifications",
          path: "/notifications",
          icon: IconNotification,
          shortcut: ["n", "n"],
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
      items: [
        {
          title: "System",
          items: [
            {
              title: "Settings",
              path: "/system/settings",
              icon: IconSettings,
              shortcut: ["s", "s"],
            },
            {
              title: "Users",
              path: "/system/user",
              icon: IconUsers,
              shortcut: ["u", "u"],
            },
            {
              title: "Roles",
              path: "/system/role",
              icon: IconUsers,
              shortcut: ["r", "r"],
            },
          ],
        },
      ],
    },
    {
      title: "Examples",
      items: [
        {
          title: "Form",
          icon: IconHelp,
          items: [
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
      items: [
        {
          title: "Auth",
          icon: IconLockAccess,
          items: [
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
          items: [
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
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
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

export const topNav: API.TopNav[] = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];

export const mockUser = [
  {
    username: "admin",
    nickname: "超级管理员",
    password: "123456",
    email: "admin@example.com",
    phone: "13800138000",
    status: 1,
    roles: ["super_admin"],
    departments: ["root"],
    positions: ["技术总监"],
    is_system: true,
  },
  {
    username: "test",
    nickname: "测试用户",
    password: "123456",
    email: "test@example.com",
    phone: "13800138001",
    status: 1,
    roles: ["user"],
    departments: ["dev"],
    positions: ["高级开发工程师"],
  },
];

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
