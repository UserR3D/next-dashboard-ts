'use client';

import { signIn, useSession } from 'next-auth/react';
import React from 'react';

type ErrorAdd = {
	error: string;
	message: string;
};

export default function Page() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [file, setFile] = React.useState<File | null>(null);
	const [results, setResults] = React.useState<boolean>(false);
	const [error, setError] = React.useState<ErrorAdd>();

	const { data: session } = useSession();

	async function addUser(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(undefined);

		const response = await fetch('/api/users/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				name,
				password,
			}),
		});
		const dataS = await response.json();

		if (!response.ok) return setError(dataS);

		setResults(true);
		await signIn('credentials', {
			email,
			password,
			redirect: true,
			callbackUrl: '/',
		});
	}

	async function uploadImage() {
		if (!file) return null;

		const formData = new FormData();
		formData.append('image', file);

		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (!response.ok) {
			return setError(data);
		}
	}

	if (session) {
		return <p>Already Registered</p>;
	}

	if (!session) {
		return (
			<div>
				<form onSubmit={addUser}>
					<label>
						Name
						<input
							type="text"
							className="border"
							onChange={(e) => setName(e.currentTarget.value)}
						/>
					</label>

					<label>
						Email
						<input
							type="email"
							className="border"
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
					</label>

					<label>
						Password
						<input
							type="password"
							className="border"
							onChange={(e) => setPassword(e.currentTarget.value)}
						/>
					</label>

					<button type="submit">Register</button>
				</form>

				<div className="mt-4">
					<input
						type="file"
						accept="image/*"
						onChange={(e) => {
							if (e.target.files?.[0]) {
								setFile(e.target.files[0]);
							}
						}}
					/>

					<button onClick={uploadImage}>Upload Image</button>
				</div>

				{error && (
					<div>
						<p>{error.error}</p>
						<p>{error.message}</p>
					</div>
				)}

				{results && (
					<div>
						<p>Success</p>
						<p>User created successfully</p>
					</div>
				)}
			</div>
		);
	}
}
