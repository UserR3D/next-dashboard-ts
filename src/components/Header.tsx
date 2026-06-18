import { Nav } from './Nav';

export const Header = () => {
	return (
		<header className="grid grid-cols-2 bg-[#050505] mb-4 items-center px-10 py-2 border-white border-b">
			<h2 className="text-2xl text-[#FFE9E9] justify-self-left">PulseView</h2>
			<Nav />
		</header>
	);
};
