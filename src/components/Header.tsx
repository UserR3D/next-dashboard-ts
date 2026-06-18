import { Nav } from './Nav';

export const Header = () => {
	return (
		<header className="grid grid-cols-2 bg-[#0C0404] mb-4 items-center px-10 py-2">
			<h2 className="text-2xl text-[#FFE9E9] justify-self-left">PulseView</h2>
			<Nav />
		</header>
	);
};
