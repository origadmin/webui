import { Row } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface UserDetailRowProps {
  row: Row<API.System.User>;
}

export const UserDetailRow = ({ row }: UserDetailRowProps) => {
  const user = row.original;
  return (
    <div className='p-4 bg-muted/50 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
      {/* Left Column for Avatar and ID */}
      <div className='flex flex-col items-center md:items-start space-y-4'>
        <Avatar className='h-24 w-24'>
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='space-y-1 text-center md:text-left'>
          <p className='font-medium text-muted-foreground'>ID</p>
          <p className='font-mono text-xs'>{user.id || "-"}</p>
        </div>
      </div>

      {/* Right Column for other details */}
      <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Email</p>
          <p>{user.email || "-"}</p>
        </div>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Phone</p>
          <p>{user.phone || "-"}</p>
        </div>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Gender</p>
          <p className='capitalize'>{user.gender || "-"}</p>
        </div>
        {/* <div className='space-y-1'>
            <p className='font-medium text-muted-foreground'>Department</p>
            <p>{user.department || "-"}</p>
          </div> */}
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Last Login IP</p>
          <p className='font-mono'>{user.last_login_ip || "-"}</p>
        </div>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Last Login Time</p>
          <p>{user.last_login_time || "-"}</p>
        </div>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Create Time</p>
          <p>{user.create_time || "-"}</p>
        </div>
        <div className='space-y-1'>
          <p className='font-medium text-muted-foreground'>Update Time</p>
          <p>{user.update_time || "-"}</p>
        </div>
        <div className='space-y-1 col-span-full'>
          <p className='font-medium text-muted-foreground'>Roles</p>
          <div className='flex flex-wrap gap-2'>
            {user.roles && user.roles.length > 0 ? (
              user.roles.map((role) => (
                <Badge key={role.id} variant='secondary'>
                  {role.name}
                </Badge>
              ))
            ) : (
              <p>-</p>
            )}
          </div>
        </div>
        <div className='space-y-1 col-span-full'>
          <p className='font-medium text-muted-foreground'>Remark</p>
          <p>{user.remark || "-"}</p>
        </div>
      </div>
    </div>
  );
};
