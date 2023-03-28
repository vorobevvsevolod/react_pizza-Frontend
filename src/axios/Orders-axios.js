import axios from './index'


class OrdersAxios {
	static async create(obj) {
		try {
			const { data } = await  axios.post(`/api/orders`, {
				...obj
			})
			return data.message
			
		}catch (e) { console.log(e) }
	}
}


export default OrdersAxios;