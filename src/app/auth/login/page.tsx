'use client';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
	const { data: session } = useSession();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');

	async function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		const result = await signIn('credentials', {
			email,
			password,
			redirect: true,
			callbackUrl: '/',
		});
		if (result?.error) {
			setError(result.error);
		}
	}

	if (session) {
		return <p>Already logged in!</p>;
	}

	if (!session) {
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
				<button type="submit">Sign in with Email</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						signIn('github', { redirect: true, callbackUrl: '/' });
					}}
				>
					Sign with Github
				</button>
				{error && <p className="text-red-500">{error}</p>}
			</form>
		);
	}
}
