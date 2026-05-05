'use server';

import { Chat } from '@/components/Chat';

export default async function Home() {
	return (
		<main>
			<Chat />
		</main>
	);
}
