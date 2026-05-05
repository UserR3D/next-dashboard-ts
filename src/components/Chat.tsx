'use client';

import { supabase } from '@/lib/supabase/client';
import { useSession } from 'next-auth/react';
import React from 'react';

type Message = {
	id: string;
	content: string;
	userId: string;
	user: { name: string };
};

export const Chat = () => {
	const { data: session } = useSession();
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [newMessage, setNewMessages] = React.useState('');
	React.useEffect(() => {
		const channel = supabase.channel('test-room');
		channel
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'message',
				},
				(payload) => {
					setMessages((prev) => [...prev, payload.new as Message]);
					console.log(payload, messages);
				},
			)
			.subscribe((status) => console.log(status));
		return () => {
			supabase.removeChannel(channel);
		};
	}, [messages]);

	React.useEffect(() => {
		async function loadMessages() {
			const { data, error } = await supabase.from('message').select();
			if (data) setMessages(data);
		}
		loadMessages();
	}, []);

	async function sendMessages(e: React.SubmitEvent) {
		e.preventDefault();
		if (!session?.user) return console.error('Necessario estar logado');

		const { data, error } = await supabase
			.from('message')
			.insert({
				content: newMessage,
				userId: session.user.id,
			})
			.select();

		if (data && data[0]) setMessages((prev) => [...prev, data[0]]);
	}

	return (
		<div>
			{messages.map((item, id) => {
				return <p key={id}>{item.content}</p>;
			})}
			<form id="myForm" onSubmit={sendMessages}>
				<input
					onChange={(e) => setNewMessages(e.target.value)}
					className="border"
					type="text"
					placeholder="Write a message"
				/>
				<button type="submit" form="myForm">
					Send
				</button>
			</form>
		</div>
	);
};
