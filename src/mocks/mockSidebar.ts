import { randomKey } from "@/utils/crypto";
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
      name: "OrigAdmin Panel",
      logo: Command,
      plan: "React + ShadcnUI",
    },
  ],
  menuItems: [
    {
      id: randomKey(),
      title: "General",
      items: [
        {
          id: randomKey(),
          title: "Dashboard",
          path: "/dashboard",
          icon: IconLayoutDashboard,
          isActive: false,
          shortcut: ["d", "d"],
          items: [
            {
              id: randomKey(),
              title: "Overview",
              path: "/dashboard/overview",
              icon: IconLayoutDashboard,
              shortcut: ["o", "o"],
              isActive: false,
            },
            {
              id: randomKey(),
              title: "Monitor",
              path: "/dashboard/monitor",
              icon: IconMessages,
              shortcut: ["m", "m"],
              isActive: false,
            },
          ],
        },
        {
          id: randomKey(),
          title: "Tasks",
          path: "/tasks",
          icon: IconChecklist,
          shortcut: ["t", "t"],
        },
        {
          id: randomKey(),
          title: "Apps",
          path: "/apps",
          icon: IconPackages,
          shortcut: ["a", "a"],
        },
        {
          id: randomKey(),
          title: "Chats",
          path: "/chats",
          icon: IconMessages,
          shortcut: ["c", "c"],
        },
      ],
    },
    {
      id: randomKey(),
      title: "Settings",
      items: [
        {
          id: randomKey(),
          title: "System",
          items: [
            {
              id: randomKey(),
              title: "Settings",
              path: "/system/settings",
              icon: IconSettings,
              shortcut: ["s", "s"],
            },
            {
              id: randomKey(),
              title: "Users",
              path: "/system/user",
              icon: IconUsers,
              shortcut: ["u", "u"],
            },
            {
              id: randomKey(),
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
      id: randomKey(),
      title: "Examples",
      items: [
        {
          id: randomKey(),
          title: "Form",
          icon: IconHelp,
          items: [
            {
              id: randomKey(),
              title: "Advanced",
              path: "/examples/form/advanced",
              icon: IconHelp,
            },
            {
              id: randomKey(),
              title: "Basic",
              path: "/examples/form/basic",
              icon: IconHelp,
            },
            {
              id: randomKey(),
              title: "Simple",
              path: "/examples/form/simple",
              icon: IconHelp,
            },
          ],
        },
        {
          id: randomKey(),
          title: "List",
          path: "/examples/list",
          icon: IconHelp,
        },
      ],
    },
    {
      id: randomKey(),
      title: "Pages",
      items: [
        {
          id: randomKey(),
          title: "Auth",
          icon: IconLockAccess,
          items: [
            {
              id: randomKey(),
              title: "Sign In",
              path: "/signin",
            },
            {
              id: randomKey(),
              title: "Sign In (2 Col)",
              path: "/signin2",
            },
            {
              id: randomKey(),
              title: "Sign Up",
              path: "/signup",
            },
            {
              id: randomKey(),
              title: "Forgot Password",
              path: "/forgot",
            },
            {
              id: randomKey(),
              title: "OTP",
              path: "/otp",
            },
          ],
        },
        {
          id: randomKey(),
          title: "Errors",
          icon: IconBug,
          items: [
            {
              id: randomKey(),
              title: "Unauthorized",
              path: "/401",
              icon: IconLock,
            },
            {
              id: randomKey(),
              title: "Forbidden",
              path: "/403",
              icon: IconUserOff,
            },
            {
              id: randomKey(),
              title: "Not Found",
              path: "/404",
              icon: IconError404,
            },
            {
              id: randomKey(),
              title: "Internal Server Error",
              path: "/500",
              icon: IconServerOff,
            },
            {
              id: randomKey(),
              title: "Maintenance Error",
              path: "/503",
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      id: randomKey(),
      title: "Other",
      items: [
        {
          id: randomKey(),
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              id: randomKey(),
              title: "Profile",
              path: "/settings",
              icon: IconUserCog,
            },
            {
              id: randomKey(),
              title: "Account",
              path: "/settings/account",
              icon: IconTool,
            },
            {
              id: randomKey(),
              title: "Appearance",
              path: "/settings/appearance",
              icon: IconPalette,
            },
            {
              id: randomKey(),
              title: "Notifications",
              path: "/settings/notifications",
              icon: IconNotification,
            },
            {
              id: randomKey(),
              title: "Display",
              path: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          id: randomKey(),
          title: "Help Center",
          path: "/help-center",
          icon: IconHelp,
        },
      ],
    },
  ],
};

export const mockTopNav: API.TopNav[] = [
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

export const mockFooter = [
  {
    key: randomKey(),
    title: "FAQs",
  },
  {
    key: randomKey(),
    title: "Privacy Policy",
  },
  {
    key: randomKey(),
    title: "Terms & Conditions",
  },
  {
    key: randomKey(),
    title: "Refund Policy",
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
  // roles: ["super_admin"],
  // departments: ["root"],
  // positions: ["技术总监"],
  is_system: true,
};

export const mockToken = {
  user_id: "admin",
  access_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzczOTYwMzQsImlzcyI6ImxvY2FsaG9zdCIsInN1YiI6ImFkbWluIn0.nlRp027z2lnX_RtyqYOaUocUcGODvWgMw-N81Evj68XMsMBIjNXS9O9arjbIZkNXU8MFnNdweOmgMQJFhUii6A",
  refresh_token:
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg1OTg0MzQsImlzcyI6ImxvY2FsaG9zdCIsInN1YiI6ImFkbWluIn0.EhuqS0I25qLJh2iMgHb-bJpKN6Jn0IOBSqDPjskPYUkNMqMHOnPeTbon_yddaiQ5mQbQie3b4IAjsCoByLmhVQ",
  expires_at: 1737396034,
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
