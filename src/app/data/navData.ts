export const pathData: PathData[] = [
	{
		label: 'Dashboard',
		route: '/',
		ihov: '\navbar\setting-purple.svg',
		i: '\navbar\setting-colorless.svg',
	},
	{
		label: 'Message',
		route: '/message',
		ihov: '\navbar\message-purple.svg',
		i: '\navbar\message-colorless.svg',
	},
	{
		label: 'My Positions',
		route: '/mypositions',
		ihov: '\navbar\mypositions-purple.svg',
		i: '\navbar\mypositions-colorless.svg',
	},
	{
		label: 'Wallet',
		route: '/wallet',
		ihov: '\navbar\wallet-purple.svg',
		i: '\navbar\wallet-colorless.svg',
	},
	{
		label: 'History',
		route: '/history',
		ihov: '\navbar\history-purple.svg',
		i: '\navbar\history-colorless.svg',
	},

]
export interface PathData {
	label: string
	route: string
	ihov: string
	i: string
}
