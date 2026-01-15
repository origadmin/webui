import { notificationHandlers } from "./notification/notifications";


// Import other handlers here
// import { userHandlers } from "./user/handlers";

export const handlers = [
  ...notificationHandlers,
  // ...userHandlers,
];
