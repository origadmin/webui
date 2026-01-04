import { NotificationItem } from "@/mocks/notification/notifications";
import { del, get, put } from "@/utils/request";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export interface NotificationResponse {
  data: NotificationItem[];
  total: number;
  unreadCount: number;
}

/** Get all notifications */
export async function getNotifications(options?: API.RequestOptions) {
  return get<NotificationResponse>("/api/v1/notifications", undefined, options);
}

/** Mark a notification as read */
export async function markAsRead(id: string, options?: API.RequestOptions) {
  return put<never>(`/api/v1/notifications/${id}/read`, undefined, options);
}

/** Mark all notifications as read */
export async function markAllAsRead(options?: API.RequestOptions) {
  return put<never>("/api/v1/notifications/read-all", undefined, options);
}

/** Clear all notifications */
export async function clearAllNotifications(options?: API.RequestOptions) {
  return del<never>("/api/v1/notifications", undefined, options);
}

export const useNotificationsQuery = () => {
  return useQuery({
    queryKey: ["/api/v1/notifications"],
    queryFn: () => getNotifications(),
  });
};

export const useMarkAsReadMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/notifications"] });
    },
  });
};

export const useMarkAllAsReadMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/notifications"] });
    },
  });
};

export const useClearAllNotificationsMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => clearAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/notifications"] });
    },
  });
};
