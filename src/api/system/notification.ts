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
  return get<NotificationResponse>("/notifications", undefined, options);
}

/** Mark a notification as read */
export async function markAsRead(id: string, options?: API.RequestOptions) {
  return put<never>(`/notifications/${id}/read`, undefined, options);
}

/** Mark all notifications as read */
export async function markAllAsRead(options?: API.RequestOptions) {
  return put<never>("/notifications/read-all", undefined, options);
}

/** Clear all notifications */
export async function clearAllNotifications(options?: API.RequestOptions) {
  return del<never>("/notifications", undefined, options);
}

export const useNotificationsQuery = () => {
  return useQuery({
    queryKey: ["/notifications"],
    queryFn: () => getNotifications(),
  });
};

export const useMarkAsReadMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/notifications"] });
    },
  });
};

export const useMarkAllAsReadMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/notifications"] });
    },
  });
};

export const useClearAllNotificationsMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: () => clearAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/notifications"] });
    },
  });
};
