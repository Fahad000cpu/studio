import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserList } from '@/components/user-list';
import { UserProfile } from '@/components/user-profile';
import { users } from '@/lib/data';
import { getSession } from '@/lib/actions';
import type { User } from '@/lib/data';
import { redirect } from 'next/navigation';
import { MessageSquare, Users } from 'lucide-react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const loggedInUser: User = {
    name: session.name || 'User',
    email: session.email,
    avatar: `https://placehold.co/100x100.png`,
    online: true,
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M5.5 22a3.5 3.5 0 0 1-3.5-3.5V5.5A3.5 3.5 0 0 1 5.5 2h13A3.5 3.5 0 0 1 22 5.5v13a3.5 3.5 0 0 1-3.5 3.5h-13zM9.9 12l.1-3.9 4.1 3.4-3 .5-1.2 0z"/></svg>
              <span className="">VibrantHub</span>
            </Link>
          </div>
          <nav className="flex flex-col p-4 gap-2">
            <Button asChild variant="ghost" className="justify-start gap-2">
              <Link href="/chat">
                <MessageSquare className="h-5 w-5" />
                Chat
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start gap-2">
               <Link href="/status">
                <Users className="h-5 w-5" />
                Status
              </Link>
            </Button>
          </nav>
          <div className="flex-1">
            <h3 className="px-4 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Contacts</h3>
            <UserList users={users} />
          </div>
          <div className="mt-auto border-t p-4">
            <UserProfile user={loggedInUser} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}
