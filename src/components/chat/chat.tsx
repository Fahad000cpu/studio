'use client'

import { useState, useEffect, useRef } from 'react';
import type { Message, User } from '@/lib/data';
import { users } from '@/lib/data';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { generateSmartReplies } from '@/ai/flows/smart-replies';

type ChatProps = {
  loggedInUser: User;
};

const generateInitialMessages = (): Message[] => {
  const now = new Date();
  return [
    { id: '1', user: users[1], text: "Hey everyone! What's up?", timestamp: new Date(now).setHours(now.getHours() - 2) },
    { id: '2', user: users[2], text: "Not much, just working on a new project. It's pretty exciting!", timestamp: new Date(now).setHours(now.getHours() - 2) + 2 * 60 * 1000 },
    { id: '3', user: users[0], text: "Sounds interesting, Charlie! What's it about?", timestamp: new Date(now).setHours(now.getHours() - 2) + 3 * 60 * 1000 },
    { id: '4', user: users[3], text: "I'm just grabbing some coffee. Anyone want anything?", timestamp: new Date(now).setHours(now.getHours() - 1) },
    { id: '5', user: users[2], text: "It's a chat app with AI-powered smart replies. Trying to make communication more efficient.", timestamp: now.getTime() - 5 * 60 * 1000 },
    { id: '6', user: users[4], text: "That's cool! I could definitely use that.", timestamp: now.getTime() - 3 * 60 * 1000 },
  ];
};

export function Chat({ loggedInUser }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  useEffect(() => {
    const initialMessages = generateInitialMessages();
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: String(Date.now()),
      user: loggedInUser,
      text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setSmartReplies([]);
    setIsLoadingReplies(true);

    const conversationHistory = updatedMessages
      .slice(-6)
      .map((msg) => `${msg.user.name}: ${msg.text}`)
      .join('\n');

    try {
      const result = await generateSmartReplies({ conversationHistory });
      setSmartReplies(result.suggestions);
    } catch (error) {
      console.error('Error generating smart replies:', error);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ChatMessages messages={messages} loggedInUser={loggedInUser} />
      <ChatInput
        onSendMessage={handleSendMessage}
        smartReplies={smartReplies}
        isLoadingReplies={isLoadingReplies}
      />
    </div>
  );
}
