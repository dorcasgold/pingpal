"use client";

import React, { useEffect, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { cn } from '@/lib/utils';
import Sidebar from '../Sidebar';
import MessageContainer from './MessageContainer';

interface ChatLayoutProps {
	defaultLayout: number[] | undefined;
}


function ChatLayout({ defaultLayout = [320, 480] }: ChatLayoutProps) {

const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

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
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>
      
      <ResizableHandle withHandle />

			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
					{/* <div className='flex justify-center items-center h-full w-full px-10'>
						<div className='flex flex-col justify-center items-center gap-4'>
							<img src='/logo.png' alt='Logo' className='w-full md:w-2/3 lg:w-1/2' />
							<p className='text-muted-foreground text-center'>Click on a chat to view the messages</p>
						</div>
					</div> */}
					<MessageContainer/>
			</ResizablePanel>

    </ResizablePanelGroup>
  )
}

export default ChatLayout