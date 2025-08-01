import type { User } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  user: User;
  className?: string;
};

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <div className="relative">
      <Avatar className={cn("h-10 w-10", className)}>
        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait" />
        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span
        className={cn(
          "absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background",
          user.online ? "bg-[hsl(var(--chart-2))]" : "bg-muted-foreground"
        )}
        title={user.online ? 'Online' : 'Offline'}
      />
    </div>
  );
}
