import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, Loader, SendHorizontal, ThumbsUp } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Textarea } from '../ui/textarea';
import EmojiPicker from './EmojiPicker';
import { Button } from '../ui/button';
import { sendMessageAction } from '@/actions/message.actions';
import { usePreferences } from '@/store/usePreferences';
import { useSelectedUser } from '@/store/useSelectedUser';
import { useMutation } from '@tanstack/react-query';
import useSound from 'use-sound';

function ChatBottomBar() {
  const [message, setMessage] = useState("");
const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const { selectedUser } = useSelectedUser();

	const { soundEnabled } = usePreferences();

const [playSound1] = useSound("/sounds/keystroke1.mp3");
	const [playSound2] = useSound("/sounds/keystroke2.mp3");
	const [playSound3] = useSound("/sounds/keystroke3.mp3");
	const [playSound4] = useSound("/sounds/keystroke4.mp3");

const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4];

	const playRandomKeyStrokeSound = () => {
		const randomIndex = Math.floor(Math.random() * playSoundFunctions.length);
		soundEnabled && playSoundFunctions[randomIndex]();
	};
	
	const { mutate: sendMessage, isPending } = useMutation({
		mutationFn: sendMessageAction,
	});

	const handleSendMessage = () => {
		if (!message.trim()) return;

		sendMessage({ content: message, messageType: "text", receiverId:selectedUser?.id});
		setMessage("");

		textAreaRef.current?.focus();
	};
	
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}

		if (e.key === "Enter" && e.shiftKey) {
			e.preventDefault();
			setMessage(message + "\n");
		}
	};

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
						onKeyDown={handleKeyDown}
						onChange={(e) => {
							setMessage(e.target.value);
							playRandomKeyStrokeSound();
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
						onClick={handleSendMessage}
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
							onClick={() => {
									sendMessage({ content: "👍", messageType: "text", receiverId: selectedUser?.id! });
								}}
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