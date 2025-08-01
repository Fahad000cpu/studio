
import { Chat } from '@/components/chat/chat';
import { getSession } from '@/lib/actions';
import type { User } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const loggedInUser: User = {
    name: session.name || 'User',
    email: session.email,
    avatar: 'https://placehold.co/100x100.png',
    online: true,
  };

  return (
    <div className="flex h-screen flex-col">
       <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-2xl">General Chat</h1>
            <p className="text-sm text-muted-foreground">A place for your team to connect and collaborate.</p>
          </div>
      </header>
      <Chat loggedInUser={loggedInUser} />
    </div>
  );
}
