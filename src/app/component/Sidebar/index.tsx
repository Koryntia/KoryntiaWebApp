'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MdExplore, MdOutlineShopTwo } from 'react-icons/md';
import { CiShop } from 'react-icons/ci';
import { TbWallet } from 'react-icons/tb';
import { RxDashboard } from 'react-icons/rx';
import { BsClock } from 'react-icons/bs';
import { PiChatCenteredDotsThin, PiGearSixThin } from 'react-icons/pi';
import { IoMdClose } from 'react-icons/io';
import HelpCenter from '../HelpCenter';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';
import type { Route } from 'next';

const Sidebar = () => {
	const t = useTranslations('SidebarNavigation');

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	let storedSidebarExpanded = 'true';
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.body.classList.add('sidebar-expanded');
		} else {
			document.body.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<aside
			ref={sidebar}
			className={`absolute pt-4 pb-0  left-0 top-20 lg:top-0 z-50 flex h-screen w-[302px] 
      flex-col items-center overflow-y-hidden bg-white03 duration-300 ease-linear lg:static 
      lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
		>
			<div className="flex items-center justify-between gap-2 py- lg:py- px-8 h-[56px] w-full">
				<div className="flex justify-center items-center gap- lg:gap-4 h-full">
					<Link
						href={'/' as Route}
						className=""
						style={{ width: '', height: '100%' }}
					>
						<Image
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: 'auto', height: '100%' }}
							src={'/templeuser.jpg'}
							alt="Logo"
							className="rounded-full"
						/>
					</Link>
					<div className="hidden lg:block flex-grow">
						<h2 className="text-textBlack text-[18px] font-semibold">
							Temple Ndukwu
						</h2>
						<p className="text-textGray text-[14px]">@temtechie</p>
					</div>
				</div>
				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden"
				>
					<IoMdClose className="h-5 w-5" />
				</button>
			</div>
			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-[539px]">
				<nav className="mt-8">
					<div>
						<h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
							{t('general.title')}
						</h3>
						<ul className="mb-2 flex flex-col gap-1">
							<li>
								<Link
									href={'/' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2
                  w-[266px]
                  hover:text-appColor1
                    ${
											pathname === '/' || pathname === ''
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<MdExplore className="h-5 w-5" />
									{t('general.dashboard')}
								</Link>
							</li>
							<li>
								<Link
									href={'/message' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/message'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<PiChatCenteredDotsThin className="h-5 w-5" />
									{t('general.message')}
								</Link>
							</li>
							<li>
								<Link
									href={'/settings' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/settings'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<PiGearSixThin className="h-5 w-5" />
									{t('general.settings')}
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
							{t('marketplace.title')}
						</h3>
						<ul className="mb-2 flex flex-col gap-1">
							<li>
								<Link
									href={'/market' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/market'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<CiShop className="h-5 w-5" />
									{t('marketplace.market')}
								</Link>
							</li>
							<li>
								<Link
									href={'/mypositions' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/mypositions'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<MdOutlineShopTwo className="h-5 w-5" />
									{t('marketplace.myPositions')}
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-2 ml-4 text-base font-semibold text-textBlack">
							{t('myProfile.title')}
						</h3>
						<ul className="mb-2 flex flex-col gap-1">
							<li>
								<Link
									href={'/collection' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/collection'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<RxDashboard className="h-5 w-5" />
									{t('myProfile.collection')}
								</Link>
							</li>
							<li>
								<Link
									href={'/wallet' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/wallet'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<TbWallet className="h-5 w-5" />
									{t('myProfile.wallet')}
								</Link>
							</li>
							<li>
								<Link
									href={'/history' as Route}
									className={`group relative flex items-center gap-2 rounded-xl 
                  py-2 px-4 font-medium duration-300 ease-in-out hover:bg-purple2 hover:text-appColor1
                    ${
											pathname === '/history'
												? 'bg-purple2 text-appColor1'
												: 'text-textGray'
										}`}
								>
									<BsClock className="h-5 w-5" />
									{t('myProfile.history')}
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<HelpCenter />
		</aside>
	);
};

export default Sidebar;
