import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NotificationsList() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">New Feature Alert</p>
          <p className="text-sm text-muted-foreground">
            We've just launched a new feature!
          </p>
        </div>
        <div className="ml-auto font-medium">2m ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maintenance Notice</p>
          <p className="text-sm text-muted-foreground">Scheduled downtime in 24 hours</p>
        </div>
        <div className="ml-auto font-medium">2h ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Security Update</p>
          <p className="text-sm text-muted-foreground">
            Important security patch available
          </p>
        </div>
        <div className="ml-auto font-medium">1d ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Account Verification</p>
          <p className="text-sm text-muted-foreground">Please verify your email</p>
        </div>
        <div className="ml-auto font-medium">3d ago</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Subscription Renewal</p>
          <p className="text-sm text-muted-foreground">Your plan renews in 7 days</p>
        </div>
        <div className="ml-auto font-medium">1w ago</div>
      </div>
    </div>
  )
}

