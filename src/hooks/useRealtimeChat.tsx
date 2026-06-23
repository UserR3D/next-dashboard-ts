import { createClient } from '@/lib/supabase/client';
import React from 'react';

const EVENT_MESSAGE_TYPE = 'message';
const supabase = createClient();
export const useRealTimeChat = (roomName: string) => {
	const [channel, setChannel] = React.useState<ReturnType<
		typeof supabase.channel
	> | null>(null);
	const [isConnected, setIsConnected] = React.useState(false);
	const [messages, setMessages] = React.useState<ChatMessage[]>([]);
	React.useEffect(() => {
		const newChannel = supabase.channel(roomName, {
			config: {
				private: true,
			},
		});
		newChannel
			.on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
				setMessages((current) => [...current, payload.payload as ChatMessage]);
			})
			.subscribe((status) => {
				if (status === 'SUBSCRIBED') {
					setIsConnected(true);
				} else {
					setIsConnected(false);
				}
			});
		setChannel(newChannel);
		return () => {
			supabase.removeChannel(newChannel);
		};
	}, [roomName]);

	const sendMessages = React.useCallback(
		async (content: string, username: string) => {
			console.log(isConnected);
			if (!channel || !isConnected)
				return console.error('Channel broadcast error');
			const message = {
				id: crypto.randomUUID(),
				content,
				user: {
					name: username,
				},
				createdAt: new Date().toUTCString(),
			};
			setMessages((current) => [...current, message]);
			return await channel?.send({
				type: 'broadcast',
				event: EVENT_MESSAGE_TYPE,
				payload: message,
			});
		},
		[channel, isConnected],
	);

	return { messages, sendMessages, isConnected };
};
