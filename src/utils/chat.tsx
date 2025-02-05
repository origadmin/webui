export const currentUser: API.Chat.User = { id: "current", name: "Current User" };

export const users: API.Chat.User[] = [
  currentUser,
  { id: "user1", name: "Alice" },
  { id: "user2", name: "Bob" },
  { id: "user3", name: "Charlie" },
];

export const initialChats: API.Chat.Chat[] = [
  {
    id: "chat1",
    name: "Alice",
    participants: ["current", "user1"],
    messages: [],
    isGroup: false,
  },
  {
    id: "chat2",
    name: "Team Chat",
    participants: ["current", "user1", "user2", "user3"],
    messages: [],
    isGroup: true,
  },
];

export function extractMentions(content: string): string[] {
  const mentionRegex = /@(\w+)/g;
  const mentions = content.match(mentionRegex);
  return mentions ? mentions.map((mention) => mention.slice(1)) : [];
}
