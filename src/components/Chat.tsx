'use client';

import { supabase } from '@/lib/supabase/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Message = {
	id: string;
	content: string;
	userId: string;
	user: {
		name: string;
		email: string;
		image: string;
		customImage: [{ url: string }];
	};
	createdAt: string;
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
			const { data, error } = await supabase
				.from('message')
				.select(`*, user:User (name, email, image, customImage:Image (url))`);
			if (error) console.error(error.message);
			if (data) setMessages(data);
			console.log(data);
		}
		loadMessages();
	}, []);

	async function sendMessages(e: React.SubmitEvent) {
		e.preventDefault();
		if (!session?.user || !newMessage.trim()) return null;
		const { data, error } = await supabase
			.from('message')
			.insert({
				content: newMessage,
				userId: session.user.id,
			})
			.select();
		if (error) console.error(error.message);
		if (data && data[0]) setMessages((prev) => [...prev, data[0]]);
		setNewMessages('');
	}
	if (!messages) return null;
	return (
		<div>
			{messages.map((item, id) => {
				return (
					<div key={id}>
						<p>{item.content}</p>
						<p>{item.user.name}</p>
						<p>{item.user.email}</p>
						{item.user.image || item.user.customImage[0].url ? (
							<Image
								alt="User Profile Chat"
								src={item.user.image || item.user.customImage[0].url}
								width={50}
								height={50}
							/>
						) : null}
						<p>{item.createdAt}</p>
					</div>
				);
			})}
			<form id="myForm" onSubmit={sendMessages}>
				<input
					onChange={(e) => setNewMessages(e.target.value)}
					className="border"
					type="text"
					placeholder={!session ? 'Please log in' : 'Write a message'}
				/>
				<button type="submit" form="myForm">
					Send
				</button>
			</form>
		</div>
	);
};
