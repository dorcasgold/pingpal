import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import { messages, USERS } from "@/db/dummy";

function MessageList() {
  const selectedUser = USERS[0];
  const currentUser = USERS[1];

  return (
    <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
      {/* Animation for message list */}
      <AnimatePresence>
        {messages?.map((message, index) => (
          <motion.div
            key={message.id || index} // Use message.id if available, fallback to index
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { type: "spring", stiffness: 100, damping: 20 },
              layout: { duration: 0.5 },
            }}
            className={cn(
              "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              message.senderId === currentUser?.id ? "items-end" : "items-start"
            )}
          >
            <div className='flex gap-3 items-center'>
              {/* Avatar for selected user */}
              {message.senderId === selectedUser?.id && (
                <Avatar className='flex justify-center items-center'>
                  <AvatarImage
                    src={selectedUser?.image}
                    alt='User Image'
                    className='border-2 border-white rounded-full'
                  />
                </Avatar>
              )}

              {/* Message content based on type */}
              {message.messageType === "text" ? (
                <span className='bg-[#454F59] p-4 rounded-md max-w-xs'>
                  {message.content}
                </span>
              ) : (
                <img
                  src={message.content}
                  alt='Message Image'
                  className='border p-2 rounded h-40 md:h-52 object-cover'
                />
              )}

              {/* Avatar for current user */}
              {message.senderId === currentUser?.id && (
                <Avatar className='flex justify-center items-center'>
                  <AvatarImage
                    src={currentUser?.image || "/user-placeholder.png"}
                    alt='User Image'
                    className='border-2 border-white rounded-full'
                  />
                </Avatar>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default MessageList;
