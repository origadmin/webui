import {
  useNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useClearAllNotificationsMutation,
} from "@/api/system/notification";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, MailCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function NotificationDropdown() {
  const queryClient = useQueryClient();
  const { data: notificationData, isLoading } = useNotificationsQuery();
  const markAsReadMutation = useMarkAsReadMutation(queryClient);
  const markAllAsReadMutation = useMarkAllAsReadMutation(queryClient);
  const clearAllMutation = useClearAllNotificationsMutation(queryClient);

  const notifications = notificationData?.data || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8 p-0 bg-muted rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="secondary">{unreadCount} Unread</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn("flex items-start gap-3 p-3", !notification.read && "bg-muted/50")}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              >
                <div className={cn("mt-1 h-2 w-2 rounded-full", notification.read ? "bg-transparent" : "bg-primary")} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => markAllAsReadMutation.mutate()}
          disabled={unreadCount === 0 || markAllAsReadMutation.isPending}
        >
          <MailCheck className="mr-2 h-4 w-4" />
          <span>Mark all as read</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => clearAllMutation.mutate()}
          disabled={notifications.length === 0 || clearAllMutation.isPending}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Clear all</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
