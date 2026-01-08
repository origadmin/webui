export const ViewTypes = {
  ROOT: "ROOT",
  GROUP: "GROUP",
  MENU: "MENU",
  LINK: "LINK",
  PAGE: "PAGE",
  BUTTON: "BUTTON",
  ELEMENT: "ELEMENT",
  REDIRECT: "REDIRECT",
  UNKNOWN: "UNKNOWN",
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
