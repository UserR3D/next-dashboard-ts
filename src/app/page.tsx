'use server';

import { RealTimeChat } from '@/components/RealTimeChat';

export default async function Home() {
	return (
		<main>
			<RealTimeChat />
		</main>
	);
}
