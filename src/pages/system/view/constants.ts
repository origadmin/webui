export const ViewTypes = {
  ROOT: "Root",
  GROUP: "Group",
  MENU: "Menu",
  LINK: "Link",
  PAGE: "Page",
  BUTTON: "Button",
  ELEMENT: "Element",
  REDIRECT: "Redirect",
  UNKNOWN: "Unknown",
} as const;

export const ViewScopes = {
  SIDEBAR: "sidebar",
  SIDEBAR_HEADER: "sidebar_header",
  SIDEBAR_FOOTER: "sidebar_footer",
  NAVBAR_LEFT: "navbar_left",
  NAVBAR_RIGHT: "navbar_right",
  PAGE_FAB: "page_fab",
  PAGE_HEADER: "page_header",
  TOOLBAR: "toolbar",
  ROW_ACTION: "row_action",
} as const;

export const scopeOptions = [
  { value: "sidebar", label: "Sidebar" },
  { value: "sidebar_header", label: "Sidebar Header" },
  { value: "sidebar_footer", label: "Sidebar Footer" },
  { value: "navbar_left", label: "Navbar Left" },
  { value: "navbar_right", label: "Navbar Right" },
  { value: "page_fab", label: "Page FAB" },
  { value: "page_header", label: "Page Header" },
  { value: "toolbar", label: "Toolbar" },
  { value: "row_action", label: "Row Action" },
];
