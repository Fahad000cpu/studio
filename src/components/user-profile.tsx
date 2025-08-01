'use client'

import { useState } from 'react';
import type { User } from '@/lib/data';
import { logout } from '@/lib/actions';
import { UserAvatar } from './user-avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LogOut, Settings, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"

export function UserProfile({ user: initialUser }: { user: User }) {
  const [user, setUser] = useState(initialUser);
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const avatar = formData.get('avatar') as string;
    setUser(prev => ({ ...prev, name, avatar }));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2">
        <UserAvatar user={user} />
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <DialogTrigger asChild>
            <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
        </DialogTrigger>
        <form action={logout}>
          <Button variant="ghost" size="icon" type="submit"><LogOut className="h-4 w-4" /></Button>
        </form>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleProfileUpdate} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" defaultValue={user.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avatar" className="text-right">
              Avatar URL
            </Label>
            <Input id="avatar" name="avatar" defaultValue={user.avatar} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
