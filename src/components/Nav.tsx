'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const Nav = () => {
	const { data: session } = useSession();
	return (
		<nav>
			{!session ? (
				<ul
					className="nav-space
					[&>li]:px-4 [&>li]:py-2 [&>li]:rounded-lg [&>li]:hover:bg-gray-800 [&>li]:transition
				"
				>
					<li>
						<Link href={'/auth/register'}>Register</Link>
					</li>
					<li>
						<Link href={'/auth/login'}>Login</Link>
					</li>
				</ul>
			) : (
				<ul className="nav-space items-center">
					<li>
						<h4>{session.user.name}</h4>
					</li>
					{session.user.image ? (
						<li>
							<ul
								className="group/user bg-white relative 
								before:absolute before:h-[100px] before:w-[100px] before:-left-2"
							>
								<li>
									<Image
										alt="User profile"
										src={session.user.image}
										width={40}
										height={40}
										loading="eager"
									/>
									<ul
										className="mt-2 -left-21 opacity-0 invisible absolute p-2 bg-red-500 border-x-2 border-b-2 rounded-b-lg border-red-800
										group-hover/user:visible group-hover/user:opacity-100 transition delay-100
										[&>li]:hover:bg-gray-800 [&>li]:p-4 [&>li]:rounded-lg [&>li]:transition"
									>
										<li>
											<Link href={''}>Posts</Link>
										</li>
										<li>
											<Link href={''}>FriendList</Link>
										</li>
										<li>
											<Link
												href={'/'}
												onClick={() => {
													signOut();
												}}
											>
												LogOut
											</Link>
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
