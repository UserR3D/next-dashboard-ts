'use server';

import { RealTimeChat } from '@/components/RealTimeChat';
import Link from 'next/link';

export default async function Home() {
	return (
		<main>
			<RealTimeChat />
			<Link href={'/dashboard'}>DashBoard</Link>
		</main>
	);
}
