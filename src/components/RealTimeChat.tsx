'use client';

import { useQueryData } from '@/hooks/useQueryDataMessage';
import { useRealTimeChat } from '@/hooks/useRealtimeChat';
import { scrollAdjust } from '@/lib/scrollAdjust';
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
	const messagesElement = React.useRef<HTMLDivElement>(null);
	const [content, setContent] = React.useState('');
	const [isInScreen, setIsInScreen] = React.useState(false);

	function handleMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (!content.trim()) return null;
		sendMessages(content, session?.user.name ?? 'Anonymous');
		setContent('');
	}

	function scrollBottom() {
		const scrollToMove = new scrollAdjust(messagesElement);
		if (messagesElement.current) {
			scrollToMove.scrollToBottom();
		}
	}

	function handleScroll(e: React.UIEvent<HTMLDivElement>) {
		const scrollToMove = new scrollAdjust(undefined, e);
		setIsInScreen(scrollToMove.halvedScroll());
	}

	React.useEffect(() => {
		const scrollToMove = new scrollAdjust(messagesElement);
		const container = messagesElement.current;
		if (container) {
			scrollToMove.scrollToBottom();
		}
	}, [cachedMessages, isConnected]);

	if (!isConnected) return <p>Connection failed</p>;

	return (
		<div className="container-xs border-2 ">
			{cachedMessages.length === 0 ? <div>No messages found yet</div> : null}
			<div
				onScroll={handleScroll}
				ref={messagesElement}
				className="relative text-white max-h-[600px] scroll-smooth rounded-xl break-all overflow-hidden overflow-y-auto"
			>
				{isInScreen ? (
					<button onClick={scrollBottom} className="sticky top-10">
						La pra baixo
					</button>
				) : null}

				{cachedMessages.map((message) => {
					return (
						<ul className="p-2" key={message.id}>
							<li className="flex justify-center gap-6">
								<p className="font-semibold border-b border-dotted">
									{message.user.name}
								</p>
								<p>
									{new Date(message.createdAt).toLocaleString('USA', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>
							</li>
							<li className="mt-2 bg-green-500 rounded-xl inline-block p-2">
								<p>{message.content}</p>
							</li>
						</ul>
					);
				})}
			</div>
			<form className="mt-6 p-4 border-t flex justify-center gap-4">
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
