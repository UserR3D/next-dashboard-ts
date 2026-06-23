import React from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
export const useQueryData = () => {
	const [newMessages, setNewMessages] = React.useState<NullAble<ChatMessage[]>>(
		[],
	);
	React.useEffect(() => {
		async function storedMessages() {
			const { data, error } = await supabase
				.from('message')
				.select('*, "user" (name, email)');
			if (error) {
				console.error(error.message);
			}
			setNewMessages(data);
		}
		storedMessages();
	}, []);

	async function handleDatabaseMessasge(content: string) {
		const response = await fetch('/api/messages/', {
			method: 'POST',
			body: JSON.stringify({
				content,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		return response;
	}
	return { newMessages, handleDatabaseMessasge };
};
