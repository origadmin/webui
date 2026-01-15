import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";


export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  createdAt: string;
}

const generateNotifications = (count: number): NotificationItem[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(3),
    message: faker.lorem.paragraph(1),
    type: faker.helpers.arrayElement(["info", "warning", "error", "success"]),
    read: faker.datatype.boolean(),
    createdAt: faker.date.recent({ days: 7 }).toISOString(),
  }));
};

let notifications = generateNotifications(15);

export const notificationHandlers = [
  // Get all notifications
  http.get("/api/v1/notifications", () => {
    return HttpResponse.json({
      data: notifications,
      total: notifications.length,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  }),

  // Mark as read
  http.put("/api/v1/notifications/:id/read", async ({ params }) => {
    const { id } = params;
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return HttpResponse.json({ success: true });
  }),

  // Mark all as read
  http.put("/api/v1/notifications/read-all", () => {
    notifications.forEach((n) => (n.read = true));
    return HttpResponse.json({ success: true });
  }),

  // Clear all
  http.delete("/api/v1/notifications", () => {
    notifications = [];
    return HttpResponse.json({ success: true });
  }),
];
