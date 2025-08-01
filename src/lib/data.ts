
export type User = {
  name: string
  avatar: string
  email: string
  online: boolean
}

export type Message = {
  id: string
  user: User
  text: string
  timestamp: number
}

export type StatusItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number; // in milliseconds
  dataAiHint?: string;
};

export type Status = {
  id: string;
  user: User;
  items: StatusItem[];
  timestamp: string;
};

export const users: User[] = [
  { name: 'Alice', avatar: 'https://placehold.co/100x100.png', email: 'alice@example.com', online: true },
  { name: 'Bob', avatar: 'https://placehold.co/100x100.png', email: 'bob@example.com', online: false },
  { name: 'Charlie', avatar: 'https://placehold.co/100x100.png', email: 'charlie@example.com', online: true },
  { name: 'Diana', avatar: 'https://placehold.co/100x100.png', email: 'diana@example.com', online: false },
  { name: 'Ethan', avatar: 'https://placehold.co/100x100.png', email: 'ethan@example.com', online: true },
]
