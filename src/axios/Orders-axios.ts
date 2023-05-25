import axios from './index'


class OrdersAxios {
	static async create(obj:any) {
		try {
			const { data } = await  axios.post(`/api/orders`, {
				...obj
			})
			return data.message
			
		}catch (e) { console.log(e) }
	}
	
	static async getByIdAndPhoneOrToken(id?:string, phone?:string) {
		try {
			if(phone){
				const { data } = await  axios.get(`api/orders?phone=${phone}&id=${id}`)
				return data.message
			}
		}catch (e) { console.log(e) }
	}

    static async Search(phone:string) {
        try {
            if(phone){
                const { data } = await  axios.get(`api/orders/search?phone=${phone}`)
                return data.message
            }
        }catch (e) { console.log(e) }
    }
}


export default OrdersAxios;