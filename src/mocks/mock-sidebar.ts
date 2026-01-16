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
    logo: "/static/logo.svg",
    plan: "React + ShadcnUI",
    avatar: "/static/logo.svg",
  },
  teams: [
    {
      name: "OrigAdmin WebUI",
      logo: "/static/logo.svg",
      plan: "React + ShadcnUI",
    },
  ],
  menuItems: [
    {
      id: "1",
      title: "General",
      children: [
        {
          id: "1-1",
          title: "Dashboard",
          path: "/dashboard",
          icon: "layout-dashboard",
          isActive: false,
          shortcut: ["d", "d"],
          children: [
            {
              id: "1-1-1",
              title: "Overview",
              path: "/dashboard/overview",
              icon: "layout-dashboard",
              shortcut: ["o", "o"],
              isActive: false,
            },
            {
              id: "1-1-2",
              title: "Monitor",
              path: "/dashboard/monitor",
              icon: "messages",
              shortcut: ["m", "m"],
              isActive: false,
            },
            {
              id: "1-1-3",
              title: "Settings",
              path: "/dashboard/settings",
              icon: "settings",
              shortcut: ["s", "s"],
              isActive: false,
            },
          ],
        },
        {
          id: "1-2",
          title: "Tasks",
          path: "/tasks",
          icon: "checklist",
          shortcut: ["t", "t"],
        },
        {
          id: "1-3",
          title: "Apps",
          path: "/apps",
          icon: "packages",
          shortcut: ["a", "a"],
        },
        {
          id: "1-4",
          title: "Chats",
          path: "/chats",
          icon: "messages",
          shortcut: ["c", "c"],
        },
      ],
    },
    {
      id: "1-5",
      title: "Settings",
      path: "/settings",
      icon: "settings",
      shortcut: ["s", "s"],
      children: [
        {
          id: "1-5-1",
          title: "System",
          icon: "server-off",
          children: [
            {
              id: "1-5-1-1",
              title: "Resource",
              path: "/system/resource",
              icon: "database",
              shortcut: ["r", "r"],
            },
            {
              id: "1-5-1-2",
              title: "View",
              path: "/system/view",
              icon: "box",
              shortcut: ["v", "v"],
            },
            {
              id: "1-5-1-3",
              title: "Permission",
              path: "/system/permission",
              icon: "palette",
              shortcut: ["p", "p"],
            },
            {
              id: "1-5-1-4",
              title: "Role",
              path: "/system/role",
              icon: "shield",
              shortcut: ["r", "r"],
            },
            {
              id: "1-5-1-5",
              title: "User",
              path: "/system/user",
              icon: "users",
              shortcut: ["u", "u"],
            },
            {
              id: "1-5-1-6",
              title: "Settings",
              path: "/system/settings",
              icon: "settings",
              shortcut: ["s", "s"],
            },
          ],
        },
      ],
    },
    {
      id: "1-6",
      title: "Examples",
      children: [
        {
          id: "1-6-1",
          title: "Form",
          icon: "help",
          children: [
            {
              id: "1-6-1-1",
              title: "Advanced",
              path: "/examples/form/advanced",
              icon: "help",
            },
            {
              id: "1-6-1-2",
              title: "Basic",
              path: "/examples/form/basic",
              icon: "help",
            },
            {
              id: "1-6-1-3",
              title: "Simple",
              path: "/examples/form/simple",
              icon: "help",
            },
          ],
        },
        {
          id: "1-6-2",
          title: "List",
          path: "/examples/list",
          icon: "help",
        },
      ],
    },
    {
      id: "1-6-3",
      title: "Pages",
      children: [
        {
          title: "Auth",
          id: "1-6-3-1",
          icon: "lock-access",
          children: [
            {
              id: "1-6-3-1-1",
              title: "Sign In",
              path: "/sign-in",
            },
            {
              id: "1-6-3-1-2",
              title: "Sign In (2 Col)",
              path: "/sign-in-2",
            },
            {
              id: "1-6-3-1-3",
              title: "Sign Up",
              path: "/sign-up",
            },
            {
              id: "1-6-3-1-4",
              title: "Forgot Password",
              path: "/forgot-password",
            },
            {
              id: "1-6-3-1-5",
              title: "OTP",
              path: "/otp",
            },
          ],
        },
        {
          id: "1-6-3-2",
          title: "Errors",
          icon: "error",
          children: [
            {
              id: "1-6-3-2-1",
              title: "Unauthorized",
              path: "/401",
              icon: "lock",
            },
            {
              id: "1-6-3-2-2",
              title: "Forbidden",
              path: "/403",
              icon: "user-off",
            },
            {
              id: "1-6-3-2-3",
              title: "Not Found",
              path: "/404",
              icon: "error-404",
            },
            {
              id: "1-6-3-2-4",
              title: "Internal Server Error",
              path: "/500",
              icon: "server-off",
            },
            {
              id: "1-6-3-2-5",
              title: "Maintenance Error",
              path: "/503",
              icon: "barrier-block",
            },
          ],
        },
      ],
    },
    {
      id: "1-6-3-3",
      title: "Other",
      icon: "settings",
      children: [
        {
          id: "1-6-3-3-1",
          title: "Settings",
          icon: "settings",
          children: [
            {
              id: "1-6-3-3-1-1",
              title: "Profile",
              path: "/settings",
              icon: "user",
            },
            {
              id: "1-6-3-3-1-2",
              title: "Account",
              path: "/settings/account",
              icon: "tool",
            },
            {
              id: "1-6-3-3-1-3",
              title: "Appearance",
              path: "/settings/appearance",
              icon: "palette",
            },
            {
              id: "1-6-3-3-1-4",
              title: "Notifications",
              path: "/settings/notifications",
              icon: "notification",
            },
            {
              id: "1-6-3-3-1-5",
              title: "Display",
              path: "/settings/display",
              icon: "browser-check",
            },
          ],
        },
        {
          id: "1-6-3-3-2",
          title: "Help Center",
          path: "/help-center",
          icon: "help",
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
    title: "Open API",
    path: "/openapi",
    icon: "command",
  },
  {
    title: "Support",
    path: "#",
    icon: "life-buoy",
  },
  {
    title: "Feedback",
    path: "#",
    icon: "send",
  },
];
