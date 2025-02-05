import type React from "react";
import { useState } from "react";
import { Chat as ChatUtils } from "@/utils";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageList: React.FC<{ messages: API.Chat.Message[]; users: API.Chat.User[] }> = ({ messages, users }) => (
  <ScrollArea className='h-[400px] p-4'>
    {messages.map((message) => {
      const sender = users.find((u) => u.id === message.senderId);
      return (
        <div key={message.id} className='mb-4'>
          <div className='flex items-center mb-1'>
            <Avatar className='h-6 w-6 mr-2'>
              <AvatarFallback>{sender?.name[0]}</AvatarFallback>
            </Avatar>
            <span className='font-semibold'>{sender?.name}</span>
            <span className='text-xs text-gray-500 ml-2'>{message.timestamp.toLocaleTimeString()}</span>
          </div>
          <p>{message.content}</p>
        </div>
      );
    })}
  </ScrollArea>
);

const MessageInput: React.FC<{ onSendMessage: (content: string) => void }> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex mt-4'>
      <Input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type a message...'
        className='flex-grow mr-2'
      />
      <Button type='submit'>Send</Button>
    </form>
  );
};

const UserList: React.FC<{ users: API.Chat.User[]; onSelectUser: (userId: string) => void }> = ({
  users,
  onSelectUser,
}) => (
  <ScrollArea className='h-[400px]'>
    {users.map((user) => (
      <Button key={user.id} onClick={() => onSelectUser(user.id)} variant='ghost' className='w-full justify-start'>
        <Avatar className='h-6 w-6 mr-2'>
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        {user.name}
      </Button>
    ))}
  </ScrollArea>
);

const CreateGroupModal: React.FC<{
  users: API.Chat.User[];
  onCreateGroup: (name: string, participants: string[]) => void;
}> = ({ users, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleCreateGroup = () => {
    if (groupName && selectedUsers.length > 0) {
      onCreateGroup(groupName, selectedUsers);
      setGroupName("");
      setSelectedUsers([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Create Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='group-name' className='text-right'>
              Group Name
            </Label>
            <Input
              id='group-name'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid gap-2'>
            <Label>Select Participants</Label>
            {users.map((user) => (
              <div key={user.id} className='flex items-center space-x-2'>
                <Checkbox
                  id={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={(checked) => {
                    setSelectedUsers(
                      checked ? [...selectedUsers, user.id] : selectedUsers.filter((id) => id !== user.id),
                    );
                  }}
                />
                <Label htmlFor={user.id}>{user.name}</Label>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleCreateGroup}>Create Group</Button>
      </DialogContent>
    </Dialog>
  );
};

function ChatPage() {
  const [chats, setChats] = useState<API.Chat.Chat[]>(ChatUtils.initialChats);
  const [selectedChat, setSelectedChat] = useState<API.Chat.Chat | null>(null);

  const handleSelectUser = (userId: string) => {
    const existingChat = chats.find((chat) => !chat.isGroup && chat.participants.includes(userId));
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      const newChat: API.Chat.Chat = {
        id: `chat${chats.length + 1}`,
        name: ChatUtils.users.find((u) => u.id === userId)?.name || "",
        participants: [ChatUtils.currentUser.id, userId],
        messages: [],
        isGroup: false,
      };
      setChats([...chats, newChat]);
      setSelectedChat(newChat);
    }
  };

  const handleCreateGroup = (name: string, participants: string[]) => {
    const newGroup: API.Chat.Chat = {
      id: `group${chats.length + 1}`,
      name,
      participants: [ChatUtils.currentUser.id, ...participants],
      messages: [],
      isGroup: true,
    };
    setChats([...chats, newGroup]);
    setSelectedChat(newGroup);
  };

  const handleSendMessage = (content: string) => {
    if (selectedChat) {
      const mentions = ChatUtils.extractMentions(content);
      const newMessage: API.Chat.Message = {
        id: `msg${selectedChat.messages.length + 1}`,
        senderId: ChatUtils.currentUser.id,
        content,
        timestamp: new Date(),
        mentions,
      };
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
      };
      setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)));
      setSelectedChat(updatedChat);

      // Simulate notifications for mentions
      mentions.forEach((mention) => {
        const mentionedUser = ChatUtils.users.find((u) => u.name.toLowerCase() === mention.toLowerCase());
        if (mentionedUser) {
          toast({
            title: "New Mention",
            description: `You were mentioned by ${ChatUtils.currentUser.name} in ${selectedChat.name}`,
          });
        }
      });
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/4 border-r p-4'>
        <h2 className='text-xl font-bold mb-4'>Chats</h2>
        <CreateGroupModal
          users={ChatUtils.users.filter((u) => u.id !== ChatUtils.currentUser.id)}
          onCreateGroup={handleCreateGroup}
        />
        <UserList
          users={ChatUtils.users.filter((u) => u.id !== ChatUtils.currentUser.id)}
          onSelectUser={handleSelectUser}
        />
      </div>
      <div className='w-3/4 p-4'>
        {selectedChat ? (
          <>
            <h2 className='text-xl font-bold mb-4'>{selectedChat.name}</h2>
            <MessageList messages={selectedChat.messages} users={ChatUtils.users} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <p>Select a chat or create a new group to start messaging.</p>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
