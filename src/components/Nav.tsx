'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const Nav = () => {
	const { data: session } = useSession();

	return (
		<nav className="grid justify-right">
			{!session ? (
				<ul className="flex ">
					<li>
						<a href="/users/register">Register</a>
					</li>
					<li>
						<a
							href="#"
							className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
							onClick={(e) => {
								e.preventDefault();
								signIn();
							}}
						>
							Login
						</a>
					</li>
				</ul>
			) : (
				<ul className="flex">
					<li>
						<h2>{session.user.name}</h2>
					</li>
					<li>
						<Image
							alt="User profile"
							src={session.user.image!}
							width={60}
							height={60}
							loading="eager"
							style={{ width: 'auto', height: 'auto' }}
						/>
					</li>
					<li>
						<a
							onClick={(e) => {
								e.preventDefault();
								signOut();
							}}
							className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
						>
							LogOut
						</a>
					</li>
				</ul>
			)}
		</nav>
	);
};
