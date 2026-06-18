'use client';

import { useQueryData } from '@/hooks/useQueryDataMessage';
import { useRealTimeChat } from '@/hooks/useRealtimeChat';
import { useSession } from 'next-auth/react';
import React from 'react';

export const RealTimeChat = () => {
	const { data: session } = useSession();
	const { messages, sendMessages, isConnected } = useRealTimeChat('teste-room');
	const { newMessages } = useQueryData();
	const cachedMessages = React.useMemo(() => {
		const mergedMessages = [...(newMessages ?? []), ...messages];
		return mergedMessages;
	}, [messages, newMessages]);
	const [content, setContent] = React.useState('');

	if (!isConnected) return <p>Connection failed</p>;

	function handleMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (!content.trim()) return null;
		sendMessages(content, session?.user.name ?? 'Anonymous');
		setContent('');
	}

	return (
		<div className="container-xs text-white">
			{cachedMessages.length === 0 ? <div>No messages found yet</div> : null}
			{cachedMessages.map((message, index) => {
				return (
					<ul key={index}>
						<li className="flex gap-6">
							<p className="font-semibold border-b border-dotted">
								{message.user.name}
							</p>
							<p>{message.createdAt}</p>
						</li>
						<li className="mt-2 bg-green-500 rounded-xl inline-block p-2">
							<p>{message.content}</p>
						</li>
					</ul>
				);
			})}
			<form className="mt-6 flex justify-center gap-4">
				<input
					onChange={(e) => setContent(e.target.value)}
					className="flex-1 border rounded-md"
					type="text"
					value={content}
				/>
				<button
					className="bg-blue-800 p-2 rounded-xs"
					type="submit"
					onClick={handleMessage}
				>
					Button
				</button>
			</form>
		</div>
	);
};
