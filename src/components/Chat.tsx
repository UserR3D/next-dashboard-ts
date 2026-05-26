'use client';

import { useRealTimeChat } from '@/hooks/use-realtime-chat';
import { useSession } from 'next-auth/react';
import React from 'react';

export const Chat = () => {
	const { data: session } = useSession();
	const [content, setContent] = React.useState('');
	const { messages, sendMessages, isConnected } = useRealTimeChat('teste-room');
	if (!isConnected) return <p>Connection failed</p>;
	return (
		<div>
			{messages.length === 0 ? <div>No messages found yet</div> : null}
			{messages.map((message, index) => {
				return (
					<ul key={index}>
						<li>{message.content}</li>
						<li>{message.id}</li>
					</ul>
				);
			})}
			<label>Chat</label>
			<input
				onChange={(e) => setContent(e.target.value)}
				className="border"
				type="text"
			/>
			<button
				onClick={async (e) => {
					e.preventDefault();
					await sendMessages(content, session?.user.name ?? 'Anonymous');
				}}
			>
				Butao
			</button>
		</div>
	);
};
