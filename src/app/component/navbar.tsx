'use client';
import { FC, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar: FC = () => {
	const linkGeneral = [
		{
			label: 'Dashboard',
			route: '/',
			ihov: '\navbardashboard-purple.svg',
			i: '\navbardashboard-colorless.svg',
		},
		{
			label: 'Message',
			route: '/message',
			ihov: '\navbarmessage-purple.svg',
			i: '\navbarmessage-colorless.svg',
		},
		{
			label: 'settings',
			route: '/settings',
			ihov: '\navbarsettings-purple.svg',
			i: '\navbarsettings-colorless.svg',
		},
	];

	const linkMarketplace = [
		{
			label: 'market',
			route: '/market',
			ihov: '\navbarmarket-purple.svg',
			i: '\navbarmarket-colorless.svg',
		},
		{
			label: 'mypositions',
			route: '/mypositions',
			ihov: '\navbarmypositions-purple.svg',
			i: '\navbarmypositions-colorless.svg',
		},
	];

	const linkMyprof = [
		{
			label: 'collection',
			route: '/collection',
			ihov: '\navbarcollection-purple.svg',
			i: '\navbarcollection-colorless.svg',
		},
		{
			label: 'wallet',
			route: '/wallet',
			ihov: '\navbarwallet-purple.svg',
			i: '\navbarwallet-colorless.svg',
		},
		{
			label: 'history',
			route: '/history',
			ihov: '\navbarhistory-purple.svg',
			i: '\navbarhistory-colorless.svg',
		},
	];

	const router = useRouter();
	const pathName = usePathname();
	const [active, setActive] = useState(pathName);
	const [isHovering, setIsHovering] = useState(false);
	const [hoverActive, setHoverActive] = useState('');
	const handleMouseOver = (label: string) => {
		setIsHovering(true);
		setHoverActive(label);
	};
	const handleMouseOut = () => {
		setIsHovering(false);
		setHoverActive('');
	};

	return (
		<>
			<nav>
				<h3>General</h3>
				<ul>
					<li>
						<Link href="/">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />{' '}
							Dashboard
						</Link>
					</li>
					<li>
						<Link href="/message">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							Message
						</Link>
					</li>
					<li>
						<Link href="/settings">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							Settings
						</Link>
					</li>
				</ul>

				<h3>Marketplace</h3>
				<ul>
					<li>
						<Link href="/market">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							Market
						</Link>
					</li>
					<li>
						<Link href="/mypositions">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							My Positions
						</Link>
					</li>
				</ul>
				<h3>My profile</h3>
				<ul>
					<li>
						<Link href="/collection">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							Collection
						</Link>
					</li>
					<li>
						<Link href="/wallet">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />
							Wallet
						</Link>
					</li>
					<li>
						<Link className="" href="/history">
							<Image src="\navbar\history-colorless.svg" alt="Setting icon" />{' '}
							history
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);

	/*             <nav className=''>
          <h1>General</h1>
          <Link href="/"> Dashboard</Link>
          <Link href="/message">Message</Link>
          <Link href="/settings">Settings</Link>
          <h1>Marketplace</h1>
          <Link href="/market">Market</Link>
          <Link href="/mypositions">My Positions</Link>
          <h1>My profile</h1>
          <Link href="/collection">Collection</Link>
          <Link href="/wallet">Wallet</Link>
          <Link href="/history">History</Link>
         </nav> */
};

export default Navbar;
