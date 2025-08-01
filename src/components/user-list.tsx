import type { User } from '@/lib/data';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';

export function UserList({ users }: { users: User[] }) {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {users.map((user) => (
        <Button key={user.email} variant="ghost" className="w-full justify-start gap-3 h-auto py-2 px-3 text-base">
          <UserAvatar user={user} className="h-8 w-8" />
          <span>{user.name}</span>
        </Button>
      ))}
    </nav>
  );
}
