import { Fragment, useState } from "react";
import { conversations } from "@/mocks/chat";
import {
  IconArrowLeft,
  IconDotsVertical,
  IconEdit,
  IconMessages,
  IconPaperclip,
  IconPhone,
  IconPhotoPlus,
  IconPlus,
  IconSearch,
  IconSend,
  IconVideo,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/PageContainer";

// const MessageList: React.FC<{ messages: API.Chat.Message[]; users: API.Chat.User[] }> = ({ messages, users }) => (
//   <ScrollArea className='h-[400px] p-4'>
//     {messages.map((message) => {
//       const sender = users.find((u) => u.id === message.senderId);
//       return (
//         <div key={message.id} className='mb-4'>
//           <div className='flex items-center mb-1'>
//             <Avatar className='h-6 w-6 mr-2'>
//               <AvatarFallback>{sender?.name[0]}</AvatarFallback>
//             </Avatar>
//             <span className='font-semibold'>{sender?.name}</span>
//             <span className='text-xs text-gray-500 ml-2'>{message.timestamp.toLocaleTimeString()}</span>
//           </div>
//           <p>{message.content}</p>
//         </div>
//       );
//     })}
//   </ScrollArea>
// );
//
// const MessageInput: React.FC<{ onSendMessage: (content: string) => void }> = ({ onSendMessage }) => {
//   const [message, setMessage] = useState("");
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       onSendMessage(message);
//       setMessage("");
//     }
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className='flex mt-4'>
//       <Input
//         type='text'
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder='Type a message...'
//         className='flex-grow mr-2'
//       />
//       <Button type='submit'>Send</Button>
//     </form>
//   );
// };
//
// const UserList: React.FC<{ users: API.Chat.User[]; onSelectUser: (userId: string) => void }> = ({
//   users,
//   onSelectUser,
// }) => (
//   <ScrollArea className='h-[400px]'>
//     {users.map((user) => (
//       <Button key={user.id} onClick={() => onSelectUser(user.id)} variant='ghost' className='w-full justify-start'>
//         <Avatar className='h-6 w-6 mr-2'>
//           <AvatarFallback>{user.name[0]}</AvatarFallback>
//         </Avatar>
//         {user.name}
//       </Button>
//     ))}
//   </ScrollArea>
// );
//
// const CreateGroupModal: React.FC<{
//   users: API.Chat.User[];
//   onCreateGroup: (name: string, participants: string[]) => void;
// }> = ({ users, onCreateGroup }) => {
//   const [groupName, setGroupName] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//
//   const handleCreateGroup = () => {
//     if (groupName && selectedUsers.length > 0) {
//       onCreateGroup(groupName, selectedUsers);
//       setGroupName("");
//       setSelectedUsers([]);
//     }
//   };
//
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant='outline'>Create Group</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create a New Group</DialogTitle>
//         </DialogHeader>
//         <div className='grid gap-4 py-4'>
//           <div className='grid grid-cols-4 items-center gap-4'>
//             <Label htmlFor='group-name' className='text-right'>
//               Group Name
//             </Label>
//             <Input
//               id='group-name'
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               className='col-span-3'
//             />
//           </div>
//           <div className='grid gap-2'>
//             <Label>Select Participants</Label>
//             {users.map((user) => (
//               <div key={user.id} className='flex items-center space-x-2'>
//                 <Checkbox
//                   id={user.id}
//                   checked={selectedUsers.includes(user.id)}
//                   onCheckedChange={(checked) => {
//                     setSelectedUsers(
//                       checked ? [...selectedUsers, user.id] : selectedUsers.filter((id) => id !== user.id),
//                     );
//                   }}
//                 />
//                 <Label htmlFor={user.id}>{user.name}</Label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Button onClick={handleCreateGroup}>Create Group</Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

type ChatUser = (typeof conversations)[number];
type UserMessages = ChatUser["messages"][number];

function ChatPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUser>(conversations[0]);
  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(null);

  // Filtered data based on the search query
  const filteredChatList = conversations.filter(({ fullName }) =>
    fullName.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const currentMessage = selectedUser.messages.reduce((acc: Record<string, UserMessages[]>, obj) => {
    const key = format(obj.timestamp, "d MMM, yyyy");

    // Create an array for the category if it doesn't exist
    if (!acc[key]) {
      acc[key] = [];
    }

    // Push the current object to the array
    acc[key].push(obj);

    return acc;
  }, {});

  return (
    <PageContainer>
      <section className='flex h-full gap-6'>
        {/* Left Side */}
        <div className='flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80'>
          <div className='bg-background sticky top-0 z-10 -mx-4 px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none'>
            <div className='flex items-center justify-between py-2'>
              <div className='flex gap-2'>
                <h1 className='text-2xl font-bold'>Inbox</h1>
                <IconMessages size={20} />
              </div>

              <Button size='icon' variant='ghost' className='rounded-lg'>
                <IconEdit size={24} className='stroke-muted-foreground' />
              </Button>
            </div>

            <label className='border-input focus-within:ring-ring flex h-12 w-full items-center space-x-0 rounded-md border pl-2 focus-within:ring-1 focus-within:outline-hidden'>
              <IconSearch size={15} className='mr-2 stroke-slate-500' />
              <span className='sr-only'>Search</span>
              <input
                type='text'
                className='w-full flex-1 bg-inherit text-sm focus-visible:outline-hidden'
                placeholder='Search chat...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          <ScrollArea className='-mx-3 h-full p-3'>
            {filteredChatList.map((chatUsr) => {
              const { id, profile, username, messages, fullName } = chatUsr;
              const lastConvo = messages[0];
              const lastMsg = lastConvo.sender === "You" ? `You: ${lastConvo.message}` : lastConvo.message;
              return (
                <Fragment key={id}>
                  <button
                    type='button'
                    className={cn(
                      "hover:bg-secondary/75 -mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm",
                      selectedUser.id === id && "sm:bg-muted",
                    )}
                    onClick={() => {
                      setSelectedUser(chatUsr);
                      setMobileSelectedUser(chatUsr);
                    }}
                  >
                    <div className='flex gap-2'>
                      <Avatar>
                        <AvatarImage src={profile} alt={username} />
                        <AvatarFallback>{username}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className='col-start-2 row-span-2 font-medium'>{fullName}</span>
                        <span className='text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis'>
                          {lastMsg}
                        </span>
                      </div>
                    </div>
                  </button>
                  <Separator className='my-1' />
                </Fragment>
              );
            })}
          </ScrollArea>
        </div>

        {/* Right Side */}
        <div
          className={cn(
            "bg-primary-foreground absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex",
            mobileSelectedUser && "left-0 flex",
          )}
        >
          {/* Top Part */}
          <div className='bg-secondary mb-1 flex flex-none justify-between rounded-t-md p-4 shadow-lg'>
            {/* Left */}
            <div className='flex gap-3'>
              <Button
                size='icon'
                variant='ghost'
                className='-ml-2 h-full sm:hidden'
                onClick={() => setMobileSelectedUser(null)}
              >
                <IconArrowLeft />
              </Button>
              <div className='flex items-center gap-2 lg:gap-4'>
                <Avatar className='size-9 lg:size-11'>
                  <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
                  <AvatarFallback>{selectedUser.username}</AvatarFallback>
                </Avatar>
                <div>
                  <span className='col-start-2 row-span-2 text-sm font-medium lg:text-base'>
                    {selectedUser.fullName}
                  </span>
                  <span className='text-muted-foreground col-start-2 row-span-2 row-start-2 line-clamp-1 block max-w-32 text-xs text-nowrap text-ellipsis lg:max-w-none lg:text-sm'>
                    {selectedUser.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className='-mr-1 flex items-center gap-1 lg:gap-2'>
              <Button size='icon' variant='ghost' className='hidden size-8 rounded-full sm:inline-flex lg:size-10'>
                <IconVideo size={22} className='stroke-muted-foreground' />
              </Button>
              <Button size='icon' variant='ghost' className='hidden size-8 rounded-full sm:inline-flex lg:size-10'>
                <IconPhone size={22} className='stroke-muted-foreground' />
              </Button>
              <Button size='icon' variant='ghost' className='h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6'>
                <IconDotsVertical className='stroke-muted-foreground sm:size-5' />
              </Button>
            </div>
          </div>

          {/* Conversation */}
          <div className='flex flex-1 flex-col gap-2 rounded-md px-4 pt-0 pb-4'>
            <div className='flex size-full flex-1'>
              <div className='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
                <div className='chat-flex flex h-40 w-full grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pr-4 pb-4'>
                  {currentMessage &&
                    Object.keys(currentMessage).map((key) => (
                      <Fragment key={key}>
                        {currentMessage[key].map((msg, index) => (
                          <div
                            key={`${msg.sender}-${msg.timestamp}-${index}`}
                            className={cn(
                              "chat-box max-w-72 px-3 py-2 break-words shadow-lg",
                              msg.sender === "You"
                                ? "bg-primary/85 text-primary-foreground/75 self-end rounded-[16px_16px_0_16px]"
                                : "bg-secondary self-start rounded-[16px_16px_16px_0]",
                            )}
                          >
                            {msg.message}{" "}
                            <span
                              className={cn(
                                "text-muted-foreground mt-1 block text-xs font-light italic",
                                msg.sender === "You" && "text-right",
                              )}
                            >
                              {format(msg.timestamp, "h:mm a")}
                            </span>
                          </div>
                        ))}
                        <div className='text-center text-xs'>{key}</div>
                      </Fragment>
                    ))}
                </div>
              </div>
            </div>
            <form className='flex w-full flex-none gap-2'>
              <div className='border-input focus-within:ring-ring flex flex-1 items-center gap-2 rounded-md border px-2 py-1 focus-within:ring-1 focus-within:outline-hidden lg:gap-4'>
                <div className='space-x-1'>
                  <Button size='icon' type='button' variant='ghost' className='h-8 rounded-md'>
                    <IconPlus size={20} className='stroke-muted-foreground' />
                  </Button>
                  <Button size='icon' type='button' variant='ghost' className='hidden h-8 rounded-md lg:inline-flex'>
                    <IconPhotoPlus size={20} className='stroke-muted-foreground' />
                  </Button>
                  <Button size='icon' type='button' variant='ghost' className='hidden h-8 rounded-md lg:inline-flex'>
                    <IconPaperclip size={20} className='stroke-muted-foreground' />
                  </Button>
                </div>
                <label className='flex-1'>
                  <span className='sr-only'>Chat Text Box</span>
                  <input
                    type='text'
                    placeholder='Type your messages...'
                    className='h-8 w-full bg-inherit focus-visible:outline-hidden'
                  />
                </label>
                <Button variant='ghost' size='icon' className='hidden sm:inline-flex'>
                  <IconSend size={20} />
                </Button>
              </div>
              <Button className='h-full sm:hidden'>
                <IconSend size={18} /> Send
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default ChatPage;
