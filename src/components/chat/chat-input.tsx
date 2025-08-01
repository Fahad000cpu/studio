'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Zap } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type ChatInputProps = {
  onSendMessage: (text: string) => void;
  smartReplies: string[];
  isLoadingReplies: boolean;
};

export function ChatInput({ onSendMessage, smartReplies, isLoadingReplies }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleSmartReplyClick = (reply: string) => {
    onSendMessage(reply);
  };

  return (
    <div className="border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 mb-2 h-8 overflow-x-auto pb-2">
        {isLoadingReplies && (
          <>
            <Skeleton className="h-8 w-24 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-32 rounded-full flex-shrink-0" />
            <Skeleton className="h-8 w-28 rounded-full flex-shrink-0" />
          </>
        )}
        {!isLoadingReplies && smartReplies.length > 0 && (
          <>
            <Zap className="h-5 w-5 text-[hsl(var(--chart-4))] flex-shrink-0" />
            {smartReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                className="rounded-full flex-shrink-0"
                onClick={() => handleSmartReplyClick(reply)}
              >
                {reply}
              </Button>
            ))}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="pr-14 min-h-[48px] resize-none"
          rows={1}
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Button
            type="submit"
            size="icon"
            className="h-8 w-8"
            disabled={!text.trim()}
            >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send Message</span>
            </Button>
        </div>
      </form>
       <p className="text-xs text-muted-foreground mt-1 text-center">
            Press Enter to send, Shift + Enter for a new line.
        </p>
    </div>
  );
}
