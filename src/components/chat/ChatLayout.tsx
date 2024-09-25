"use client";

import React, { useEffect, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { cn } from '@/lib/utils';
import Sidebar from '../Sidebar';
import MessageContainer from './MessageContainer';
import { User } from '@/db/dummy';
import { useSelectedUser } from '@/store/useSelectedUser';

interface ChatLayoutProps {
	defaultLayout: number[] | undefined;
	users: User[];
}


function ChatLayout({ defaultLayout = [320, 480], users }: ChatLayoutProps) {

const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { selectedUser } = useSelectedUser();

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Initial check
		checkScreenWidth();

		// Event listener for screen width changes
		window.addEventListener("resize", checkScreenWidth);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

  return (
		<ResizablePanelGroup direction='horizontal'
			className='h-full items-stretch border  dark:bg-[#101214] rounded-lg
			 bg-purple-950 bg-clip-padding backdrop-filter  backdrop-blur-2xl bg-opacity-60 backdrop-saturate-150 backdrop-contrast-125'
			onLayout={(sizes: number[]) => {	document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}; `;}} // Save layout size to cookie
>
      <ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={8}
				collapsible={true}
				minSize={isMobile ? 0 : 24}
				maxSize={isMobile ? 8 : 30}
				onCollapse={() => {
					setIsCollapsed(true);
					document.cookie = `react-resizable-panels:collapsed=true;`;
				}}
				onExpand={() => {
					setIsCollapsed(false);
					document.cookie = `react-resizable-panels:collapsed=false;`;
				}}
				className={cn(isCollapsed && "min-w-[80px] transition-all duration-300 ease-in-out")}
			>
        <Sidebar isCollapsed={isCollapsed} users={users}/>
      </ResizablePanel>
      
      <ResizableHandle withHandle />

				<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				{!selectedUser && (
					<div className='flex justify-center items-center h-full w-full px-10'>
						<div className='flex flex-col justify-center items-center gap-4'>
							<img src='/logo.png' alt='Logo' className='w-48' />
							<p className='text-muted-foreground text-center'>Click on a chat to view the messages</p>
						</div>
					</div>
				)}
				{selectedUser && <MessageContainer />}
			</ResizablePanel>

    </ResizablePanelGroup>
  )
}

export default ChatLayout