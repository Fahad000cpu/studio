
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const allChannels = [
    { name: 'Aaj Tak', followers: '59.7M', image: 'https://placehold.co/40x40.png', dataAiHint: 'news logo', verified: true, followed: true },
    { name: 'MyGov India', followers: '38M', image: 'https://placehold.co/40x40.png', dataAiHint: 'government building', verified: true, followed: false },
    { name: 'StarPlus', followers: '34.M', image: 'https://placehold.co/40x40.png', dataAiHint: 'star logo', verified: true, followed: false },
    { name: 'Netflix', followers: '32.1M', image: 'https://placehold.co/40x40.png', dataAiHint: 'N logo', verified: true, followed: true },
    { name: 'Sandeep Maheshwari', followers: '28.6M', image: 'https://placehold.co/40x40.png', dataAiHint: 'person portrait', verified: true, followed: false },
    { name: 'PMO India', followers: '25.6M', image: 'https://placehold.co/40x40.png', dataAiHint: 'government building', verified: true, followed: false },
    { name: 'Indian Cricket Team', followers: '25.5M', image: 'https://placehold.co/40x40.png', dataAiHint: 'cricket logo', verified: true, followed: false },
    { name: 'Darshan Raval', followers: '20.2M', image: 'https://placehold.co/40x40.png', dataAiHint: 'singer portrait', verified: true, followed: false },
    { name: 'News24', followers: '18.1M', image: 'https://placehold.co/40x40.png', dataAiHint: 'news logo', verified: true, followed: false },
    { name: 'MC STAN', followers: '11.8M', image: 'https://placehold.co/40x40.png', dataAiHint: 'rapper portrait', verified: true, followed: false },
    { name: 'Sony SAB', followers: '11.1M', image: 'https://placehold.co/40x40.png', dataAiHint: 'tv channel logo', verified: true, followed: false },
    { name: 'अंग्रेजी बोलना सीखो', followers: '12.3M', image: 'https://placehold.co/40x40.png', dataAiHint: 'owl logo', verified: true, followed: false },
    { name: 'कड़वा सच', followers: '8.5M', image: 'https://placehold.co/40x40.png', dataAiHint: 'theater masks', verified: true, followed: false },
];


export default function FindChannelsPage() {
    const [channels, setChannels] = useState(allChannels);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFollowToggle = (channelName: string) => {
        setChannels(prevChannels =>
            prevChannels.map(channel =>
                channel.name === channelName ? { ...channel, followed: !channel.followed } : channel
            )
        );
    };

    const filteredChannels = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen flex-col bg-background">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href="/status">
                        <ArrowLeft />
                    </Link>
                </Button>
                <h1 className="text-lg font-semibold md:text-2xl">Find channels</h1>
            </header>
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for channels..."
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <section>
                        <h2 className="text-base font-semibold mb-2 px-2">Channels you might like</h2>
                        <div className="space-y-1">
                            {filteredChannels.map((channel) => (
                                <div key={channel.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={channel.image} alt={channel.name} data-ai-hint={channel.dataAiHint} />
                                            <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-semibold">{channel.name}</p>
                                                {channel.verified && <svg viewBox="0 0 16 16" className="h-4 w-4 fill-green-500"><path d="M15.55,8.85L13,8,15.5,7.12A1.25,1.25,0,0,0,14.45,6L11,7.5,9.5,4.1a1.25,1.25,0,0,0-2.3,0L5.7,7.5,2.2,6A1.25,1.25,0,0,0,1.15,7.12L3.6,8,1.1,8.85A1.25,1.25,0,0,0,2.2,10L5.7,8.5,7.2,11.9a1.25,1.25,0,0,0,2.3,0L11,8.5,14.45,10A1.25,1.25,0,0,0,15.55,8.85Z"></path></svg>}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{channel.followers} followers</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={channel.followed ? 'secondary' : 'outline'}
                                        size="sm"
                                        onClick={() => handleFollowToggle(channel.name)}
                                    >
                                        {channel.followed ? 'Following' : 'Follow'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
