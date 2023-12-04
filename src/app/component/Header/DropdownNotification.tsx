'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IoNotificationsOutline } from 'react-icons/io5'

function DropdownNotification() {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [notifying, setNotifying] = useState(true)

	const trigger = useRef<any>(null)
	const dropdown = useRef<any>(null)

	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!dropdown.current)
				return
			if (
				!dropdownOpen
				|| dropdown.current.contains(target)
				|| trigger.current.contains(target)
			)
				return
			setDropdownOpen(false)
		}
		document.addEventListener('click', clickHandler)
		return () => document.removeEventListener('click', clickHandler)
	})

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!dropdownOpen || keyCode !== 27)
				return
			setDropdownOpen(false)
		}
		document.addEventListener('keydown', keyHandler)
		return () => document.removeEventListener('keydown', keyHandler)
	})

	return (
		<li className="relative">
			<Link
				ref={trigger}
				onClick={() => {
					setNotifying(false)
					setDropdownOpen(!dropdownOpen)
				}}
				href="#"
				className="relative flex h-8.5 w-8.5 items-center justify-center mx-6 rounded-full hover:text-appColor1"
			>
				<span
					className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full ${
            notifying === false ? 'hidden' : 'inline'
					}`}
				>
					<span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
				</span>
				<IoNotificationsOutline className="h-5 w-5" />
			</Link>

			<div
				ref={dropdown}
				onFocus={() => setDropdownOpen(true)}
				onBlur={() => setDropdownOpen(false)}
				className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
				}`}
			>
				<div className="px-4.5 py-3">
					<h5 className="text-sm font-medium text-bodydark2">Notification</h5>
				</div>

				<ul className="flex h-auto flex-col overflow-y-auto">
					<li>
						<Link
							className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
							href="#"
						>
							<p className="text-sm">
								<span className="text-black dark:text-white">
									Edit your information in a swipe
								</span>
								{' '}
								Sint occaecat cupidatat non proident, sunt in culpa qui officia
								deserunt mollit anim.
							</p>

							<p className="text-xs">12 May, 2025</p>
						</Link>
					</li>
					<li>
						<Link
							className="flex flex-col gap-2.5 border-t px-4.5 py-3"
							href="#"
						>
							<p className="text-sm">
								<span className="text-black dark:text-white">
									It is a long established fact
								</span>
								{' '}
								that a reader will be distracted by the readable.
							</p>

							<p className="text-xs">24 Feb, 2025</p>
						</Link>
					</li>
					<li>
						<Link
							className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3"
							href="#"
						>
							<p className="text-sm">
								<span className="text-black dark:text-white">
									There are many variations
								</span>
								{' '}
								of passages of Lorem Ipsum available, but the majority have
								suffered
							</p>

							<p className="text-xs">04 Jan, 2025</p>
						</Link>
					</li>
				</ul>
			</div>
		</li>
	)
}

export default DropdownNotification
