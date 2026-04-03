'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
	const { data: session } = useSession();
	return (
		<div>
			<h1>{session?.user?.email}</h1>
			<h1>{session?.user?.name}</h1>
			{session?.user.image ? (
				<Image
					alt="user profile"
					src={session.user.image}
					width={400}
					height={400}
					style={{ width: 'auto', height: 'auto' }}
					loading="eager"
				/>
			) : (
				''
			)}
		</div>
	);
}
