'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export const Nav = () => {
	const { data: session } = useSession();
	return (
		<nav>
			{!session ? (
				<ul className="flex justify-end gap-5 text-white">
					<li>
						<a href="/users/register">Register</a>
					</li>
					<li>
						<a
							href="#"
							className="px-4 py-2 rounded-lg hover:bg-gray-800 transition"
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
				<ul className="flex justify-end text-white items-center box-border">
					<li className="px-4 checked:border-indigo-500">
						<h4>{session.user.name}</h4>
					</li>
					{session.user.image ? (
						<li>
							<ul className="relative group before:absolute before:h-[100px] before:w-[100px] before:-left-2">
								<li>
									<Image
										alt="User profile"
										src={session.user.image}
										width={60}
										height={60}
										loading="eager"
									/>
									<ul
										className="
										mt-2 -left-6 opacity-0 invisible absolute p-2 bg-red-500 group-hover:opacity-100 border-x-4 border-b-4 rounded-b-lg border-red-800
										group-hover:visible transition delay-100
										[&>li]:hover:bg-gray-800 [&>li]:p-4 [&>li]:rounded-lg [&>li]:transition"
									>
										<li>
											<a>Posts</a>
										</li>
										<li>
											<a>FriendList</a>
										</li>
										<li>
											<a
												onClick={(e) => {
													e.preventDefault();
													signOut();
												}}
											>
												LogOut
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					) : null}
				</ul>
			)}
		</nav>
	);
};
