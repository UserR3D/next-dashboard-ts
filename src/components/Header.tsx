import Link from 'next/link';
import { Nav } from './Nav';

export const Header = () => {
	return (
		<header className="flex justify-between bg-[#050505] mb-4 items-center px-10 py-2 box-border max-h-[60px]">
			<Link href={'/'}>
				<h1 className="text-2xl text-[#FFE9E9] transition-colors delay-200 ease-in hover:text-[#e81e17]">
					PulseView
				</h1>
			</Link>
			<Nav />
		</header>
	);
};
