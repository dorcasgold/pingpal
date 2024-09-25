import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, Loader, SendHorizontal, ThumbsUp } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Textarea } from '../ui/textarea';
import EmojiPicker from './EmojiPicker';
import { Button } from '../ui/button';

function ChatBottomBar() {
  const [message, setMessage] = useState("");
const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const isPending = false;
  return (
    <div className='p-2 flex justify-between w-full items-center gap-2 text-white'>
     {!message.trim() && <ImageIcon size={20} className='cursor-pointer text-white dark:text-muted-foreground' />}
      
      <AnimatePresence>
        <motion.div
					layout
					initial={{ opacity: 0, scale: 1 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 1 }}
					transition={{
						opacity: { duration: 0.5 },
						layout: {
							type: "spring",
							bounce: 0.15,
						},
					}}
					className='w-full relative'
        >
          <Textarea
						autoComplete='off'
						placeholder='Aa'
						rows={1}
						className='w-full border text-white rounded-full flex items-center h-9 resize-none overflow-hidden
						bg-background min-h-0 placeholder:text-white dark:placeholder:text-muted-foreground'
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
            }}
            ref={textAreaRef}
          />
          <div className='absolute right-2 bottom-0.5 '>
						<EmojiPicker
							onChange={(emoji) => {
								setMessage(message + emoji);
								if (textAreaRef.current) {
									textAreaRef.current.focus();
								}
							}}
						/>
					</div>
        </motion.div>

        {message.trim() ? (
					<Button
						className='h-9 w-9 dark:bg-muted bg-purple-800 bg-opacity-45 text-white dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
						variant={"ghost"}
						size={"icon"}
					>
						<SendHorizontal size={20}/>
					</Button>
				) : (
					<Button
						className='h-9 w-9 hover:bg-purple-950 bg-purple-800 bg-opacity-45 dark:bg-muted text-white dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
						variant={"ghost"}
						size={"icon"}
					>
						{!isPending && (
							<ThumbsUp
								size={20}
								className='text-white dark:text-muted-foreground dark:hover:text-white'
							/>
						)}
						{isPending && <Loader size={20} className='animate-spin' />}
					</Button>
				)}
      </AnimatePresence>
    </div>
  )
}

export default ChatBottomBar