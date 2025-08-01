'use client'

import type { Message, User } from '@/lib/data';
import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';

type ChatMessagesProps = {
  messages: Message[];
  loggedInUser: User;
};

export function ChatMessages({ messages, loggedInUser }: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
      <div className="space-y-6">
        {messages.map((message) => {
          const isSender = message.user.email === loggedInUser.email;
          return (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-3',
                isSender ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {!isSender && <UserAvatar user={message.user} className="h-8 w-8 self-start" />}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-[70%] shadow-sm',
                  isSender
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-card-foreground rounded-bl-none'
                )}
              >
                {!isSender && <p className="text-sm font-semibold mb-1 text-accent-foreground/80">{message.user.name}</p>}
                <p className="text-sm">{message.text}</p>
                <p className={cn(
                  "text-xs mt-2 text-right",
                  isSender ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {format(new Date(message.timestamp), 'p')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
