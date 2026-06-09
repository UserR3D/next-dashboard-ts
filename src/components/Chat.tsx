'use client';

import { useQueryData } from '@/hooks/useQueryDataMessage';
import { useRealTimeChat } from '@/hooks/useRealtimeChat';
import { useSession } from 'next-auth/react';
import React from 'react';

export const Chat = () => {
	const { data: session } = useSession();
	const { messages, sendMessages, isConnected } = useRealTimeChat('teste-room');
	const { newMessages, handleDatabaseMessasge } = useQueryData();
	const cachedMessages = React.useMemo(() => {
		const mergedMessages = [...(newMessages ?? []), ...messages];
		return mergedMessages;
	}, [messages, newMessages]);
	const [content, setContent] = React.useState('');
	if (!isConnected) return <p>Connection failed</p>;

	function handleMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		sendMessages(content, session?.user.name ?? 'Anonymous');
		if (session) handleDatabaseMessasge(content);
	}

	return (
		<div>
			{cachedMessages.length === 0 ? <div>No messages found yet</div> : null}
			{cachedMessages.map((message, index) => {
				return (
					<ul key={index}>
						<li>{message.content}</li>
						<li>{message.id}</li>
						<li></li>
					</ul>
				);
			})}
			<label>Chat</label>
			<input
				onChange={(e) => setContent(e.target.value)}
				className="border"
				type="text"
			/>
			<button onClick={handleMessage}>Butao</button>
		</div>
	);
};
