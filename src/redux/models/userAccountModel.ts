export interface userAccountModel {
	address: any
	connector: any
	isConnecting: boolean | null
	isReconnecting: boolean | null
	isConnected: boolean | null
	isDisconnected: boolean | null
	status: string
}
