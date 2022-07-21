import request from '@/utils/request'

//获取标签
export const getTag = (data?) => {
	return request({
		url: '/cq-tui/Tags',
		method: 'POST',
		data
	})
}
export const getIndex = (data?) => {
	return request({
		url: '/cq-tui/Index2',
		method: 'POST',
		data
	})
}

export const getInformation = (data?) => {
	return request({
		url: '/cq-tui/Information2',
		method: 'POST',
		data
	})
}
export const Login = (data?) => {
	return request({
		url: '/cq-tui/Login',
		method: 'POST',
		data
	})
}

export const SendCode = (data?: Object) => {
	return request({
		url: '/cq-tui/SendCode',
		method: 'POST',
		data
	})
}

export const getCoupon = (data?: Object) => {
	return request({
		url: '/cq-tui/GameCoupon',
		method: 'POST',
		data
	})
}

export const ReceiveCoupon = (data?: Object) => {
	return request({
		url: '/cq-tui/ReceiveCoupon',
		method: 'POST',
		data
	})
}

export const getKey = (data?: Object) => {
	return request({
		url: '/cq-tui/Key',
		method: 'POST',
		data
	})
}
export const SetInfo = (data?) => {
	return request({
		url: '/cq-tui/SetInfo',
		method: 'POST',
		data
	})
}
export const getNewGame = (data?) => {
	return request({
		url: '/cq-tui/NewGame',
		method: 'POST',
		data
	})
}

export const getHotGame = (data?) => {
	return request({
		url: '/cq-tui/HotGame',
		method: 'POST',
		data
	})
}

export const SearchGame = (data?) => {
	return request({
		url: '/cq-tui/SearchGame',
		method: 'POST',
		data
	})
}
export const getPackInfo = (data?) => {
	return request({
		url: '/cq-tui/PackInfo',
		method: 'POST',
		data
	})
}