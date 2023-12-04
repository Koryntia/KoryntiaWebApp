import type { userAccountModel } from '@/redux/models/userAccountModel'

export const userAccountState: userAccountModel = {
	address: '',
	connector: {},
	isConnecting: null,
	isReconnecting: null,
	isConnected: null,
	isDisconnected: null,
	status: '',
}
