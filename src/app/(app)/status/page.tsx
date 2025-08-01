
'use client';

import { getSession } from '@/lib/actions';
import { users } from '@/lib/data';
import type { User, Status as StatusType } from '@/lib/data';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlusCircle, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';
import { StatusViewer } from '@/components/status/status-viewer';

const initialStatuses: StatusType[] = [
  { 
    id: 'status1',
    user: users[0], 
    items: [
      { id: 'item1', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'sunset landscape', duration: 5000 },
      { id: 'item2', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'beach waves', duration: 5000 },
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  { 
    id: 'status2',
    user: users[2], 
    items: [
      { id: 'item3', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'computer desk', duration: 5000 },
    ],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'status3',
    user: users[4],
    items: [
        { id: 'item4', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'mountain view', duration: 5000 },
        { id: 'item5', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'forest trail', duration: 5000 },
        { id: 'item6', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'hiking boots', duration: 5000 },
    ],
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'status4',
    user: users[1],
    items: [
        { id: 'item7', type: 'image', url: 'https://placehold.co/1080x1920.png', dataAiHint: 'city street', duration: 5000 },
    ],
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];


export default function StatusPage() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [statuses] = useState<StatusType[]>(initialStatuses);
  const [channels] = useState([
    { name: 'MyGov India', followers: '38M', image: 'https://placehold.co/40x40.png', dataAiHint: 'government building', verified: true, message: 'For previous trivia Correct Answer: D)...' },
    { name: 'अंग्रेजी बोलना सीखो', followers: '12.3M', image: 'https://placehold.co/40x40.png', dataAiHint: 'owl logo', verified: true },
    { name: 'कड़वा सच', followers: '8.5M', image: 'https://placehold.co/40x40.png', dataAiHint: 'theater masks', verified: true },
    { name: 'Quotes', followers: '483K', image: 'https://placehold.co/40x40.png', dataAiHint: 'quotes logo', verified: false },
  ]);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(0);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (!session) {
        redirect('/login');
      }
      setLoggedInUser({
        name: session.name || 'User',
        email: session.email,
        avatar: 'https://placehold.co/100x100.png',
        online: true,
      });
    }
    fetchSession();
  }, []);

  const openViewer = (index: number) => {
    setSelectedStatusIndex(index);
    setViewerOpen(true);
  };

  if (!loggedInUser) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <StatusViewer
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        statuses={statuses}
        startIndex={selectedStatusIndex}
      />
      <div className="flex h-screen flex-col bg-background">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
          <h1 className="text-lg font-semibold md:text-2xl">Updates</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Search className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5"/></Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            <section>
              <h2 className="text-base font-semibold mb-2 px-2">Status</h2>
              <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 pb-4 px-2">
                      <div className="flex-shrink-0 w-24 text-center space-y-1">
                          <div className="relative">
                              <Avatar className="h-16 w-16 mx-auto border-2 border-dashed border-muted-foreground">
                                  <AvatarImage src={loggedInUser.avatar} alt="My Status" data-ai-hint="person portrait"/>
                                  <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <button className="absolute bottom-0 right-3 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center">
                                  <PlusCircle className="h-4 w-4"/>
                              </button>
                          </div>
                          <p className="text-xs font-medium">Add status</p>
                      </div>
                      {statuses.map((status, index) => (
                          <button key={status.id} className="flex-shrink-0 w-24 text-center space-y-1" onClick={() => openViewer(index)}>
                              <div className="relative inline-block">
                                <Avatar className="h-16 w-16 mx-auto border-2 border-green-500 p-0.5">
                                  <AvatarImage src={status.user.avatar} alt={status.user.name} data-ai-hint="person portrait"/>
                                  <AvatarFallback>{status.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              </div>
                              <p className="text-xs truncate">{status.user.name}</p>
                          </button>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>

            <div className="border-b"></div>

            <section>
              <div className="flex justify-between items-center mb-2 px-2">
                <h2 className="text-base font-semibold">Channels</h2>
                <Button variant="ghost" size="sm">Explore</Button>
              </div>
              <div className="space-y-4">
                  {channels.map((channel) => (
                      <div key={channel.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                  <AvatarImage src={channel.image} alt={channel.name} data-ai-hint={channel.dataAiHint}/>
                                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                  <div className="flex items-center gap-1">
                                      <p className="font-semibold">{channel.name}</p>
                                      {channel.verified && <svg viewBox="0 0 16 16" className="h-4 w-4 fill-green-500"><path d="M15.55,8.85L13,8,15.5,7.12A1.25,1.25,0,0,0,14.45,6L11,7.5,9.5,4.1a1.25,1.25,0,0,0-2.3,0L5.7,7.5,2.2,6A1.25,1.25,0,0,0,1.15,7.12L3.6,8,1.1,8.85A1.25,1.25,0,0,0,2.2,10L5.7,8.5,7.2,11.9a1.25,1.25,0,0,0,2.3,0L11,8.5,14.45,10A1.25,1.25,0,0,0,15.55,8.85Z"></path></svg>}
                                  </div>
                                {channel.message ? (
                                      <p className="text-sm text-muted-foreground truncate">{channel.message}</p>
                                  ) : (
                                      <p className="text-sm text-muted-foreground">{channel.followers} followers</p>
                                  )}
                              </div>
                          </div>
                          <Button variant="outline" size="sm">Follow</Button>
                      </div>
                  ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
