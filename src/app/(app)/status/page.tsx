import { getSession } from '@/lib/actions';
import { users } from '@/lib/data';
import type { User } from '@/lib/data';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default async function StatusPage() {
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

  const statuses = [
    { user: users[0], image: 'https://placehold.co/300x500.png', story: 'Enjoying the beautiful sunset!', dataAiHint: 'sunset landscape' },
    { user: users[2], image: 'https://placehold.co/300x500.png', story: 'My new coding setup. #developer', dataAiHint: 'computer desk' },
    { user: users[4], image: 'https://placehold.co/300x500.png', story: 'Just climbed a mountain!', dataAiHint: 'mountain view' },
  ];

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <h1 className="text-lg font-semibold md:text-2xl">Status Updates</h1>
          <p className="text-sm text-muted-foreground">See what your friends are up to.</p>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="group">
            <CardHeader className="p-0 relative h-48">
              <Image
                src={`https://placehold.co/300x500.png`}
                alt="My Status"
                width={300}
                height={500}
                data-ai-hint="abstract background"
                className="w-full h-full object-cover rounded-t-lg"
              />
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button className="flex flex-col items-center justify-center text-white bg-black/30 rounded-full h-20 w-20 border-2 border-dashed border-white">
                    <span>Add</span>
                  </button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-base">My Status</CardTitle>
              <p className="text-sm text-muted-foreground">Tap to add a new update</p>
            </CardContent>
          </Card>
          {statuses.map((status) => (
            <Card key={status.user.email} className="group overflow-hidden">
              <CardHeader className="p-0 relative h-48">
                <Image
                  src={status.image}
                  alt={status.story}
                  width={300}
                  height={500}
                  data-ai-hint={status.dataAiHint}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                   <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src={status.user.avatar} alt={status.user.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{status.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                 <p className="absolute bottom-4 right-4 text-xs text-white bg-black/50 px-2 py-1 rounded-full">{status.story}</p>
              </CardHeader>
               <CardContent className="p-4">
                <CardTitle className="text-base truncate">{status.user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Viewed 2 hours ago</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
