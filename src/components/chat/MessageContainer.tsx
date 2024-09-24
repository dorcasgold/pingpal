import React from 'react'
import ChatTopBar from './ChatTopBar'
import MessageList from './MessageList'
import ChatBottomBar from './ChatBottomBar'

function MessageContainer() {
  return (
    <div className='dark:text-white flex flex-col justify-between w-full h-full'>
			<ChatTopBar />

			<div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
				<MessageList />
				<ChatBottomBar />
			</div>
		</div>
  )
}

export default MessageContainer