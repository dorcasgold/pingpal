import { USERS } from "@/db/dummy";
import { ScrollArea } from "./ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { LogOut, MessageSquareMoreIcon } from "lucide-react";

interface SidebarProps {
	isCollapsed: boolean;
}

function Sidebar({ isCollapsed }: SidebarProps) {
	const selectedUser = USERS[0]; // Currently selected user (can be dynamically set)

	return (
		<div className='group relative flex flex-col h-full gap-4 p-2 max-h-full overflow-auto bg-background dark:text-white'>
			{/* Header */}
			{!isCollapsed && (
				<div className='flex justify-between text-center p-2 items-center'>
					<div className='flex gap-2 items-center justify-center text-2xl'>
						<p className='font-medium'>Chats</p>
						<MessageSquareMoreIcon className='font-medium w-8 h-8'/>
					</div>
				</div>
			)}
			{
				isCollapsed && (
				<div className='flex justify-center text-center p-2 items-center my-2'>
					<div className='flex gap-2 items-center justify-center text-2xl'>
						<MessageSquareMoreIcon className='font-medium w-8 h-8'/>
					</div>
				</div>
			)
			}

			{/* User List */}
			<ScrollArea className='gap-2 px-2'>
				{USERS.map((user, idx) =>
					isCollapsed ? (
						<TooltipProvider key={idx}>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<div>
										<Avatar className="my-4">
											<AvatarImage
												src={user.image || "/user-placeholder.png"}
												alt='User Image'
												className='border-2 border-white rounded-full w-10 h-10'
											/>
											<AvatarFallback>{user.name[0]}</AvatarFallback>
										</Avatar>
										<span className='sr-only'>{user.name}</span>
									</div>
								</TooltipTrigger>
								<TooltipContent side='right' className='flex items-center gap-4'>
									{user.name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<Button
							key={idx}
							variant={"grey"}
							size='xl'
							className={cn(
								"w-full justify-start gap-4 my-1 dark:text-white",
								// Apply different styling if the user is selected
								selectedUser?.email === user.email
									? "dark:bg-[#5E4DB2] dark:text-white dark:hover:bg-[#6E5DC6] bg-[#BFDBF847] hover:bg-[#9BB4CA80]"
									: "bg-[#C8E1F91A] dark:bg-[#2B273F] hover:bg-[#9BB4CA80] dark:hover:bg-[#352C63]"
							)}
						>
							<Avatar className='flex justify-center items-center'>
								<AvatarImage
									src={user.image || "/user-placeholder.png"}
									alt={"User image"}
									className='w-10 h-10'
								/>
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
							<div className='flex flex-col max-w-28'>
								<span>{user.name}</span>
							</div>
						</Button>
					)
				)}
			</ScrollArea>

			{/* Logout Section */}
			<div className='mt-auto'>
				<div className='flex justify-between items-center gap-2 md:px-6 py-2'>
					{!isCollapsed && (
						<div className='hidden md:flex gap-2 items-center '>
							<Avatar className='flex justify-center items-center'>
								<AvatarImage
									src={"/user-placeholder.png"}
									alt='avatar'
									referrerPolicy='no-referrer'
									className='w-8 h-8 border-2 border-white rounded-full'
								/>
							</Avatar>
							<p className='font-bold'>{"John Doe"}</p>
						</div>
					)}
					<div className='flex'>
						<LogOut size={22} cursor={"pointer"} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
