'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page() {
	const router = useRouter();
	const { data: session } = useSession();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');

	if (session) {
		return <p>Authenticated</p>;
	}

	async function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
		if (result?.error) {
			setError(result.error);
		} else {
			router.push('/');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="email">
				Email address
				<input
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					id="email"
					name="email"
				/>
			</label>
			<label htmlFor="password">
				Password
				<input
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					id="password"
					name="password"
				/>
			</label>
			<button>Sign in with Email</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					signIn('github');
				}}
			>
				Sign with Github
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
}
