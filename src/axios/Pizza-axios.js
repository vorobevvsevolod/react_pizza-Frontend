import axios from './index'


class PizzaAxios {
	static async add(product) {
		try {
			if(product.productId){
				const { data } = await  axios.post('/api/basketpizza', {
					"productId": product.productId,
					"description": product.description,
					"dopProducts": product.dopProducts
				})
				return data.message
			}else{
				const { data } = await  axios.post('/api/basketpizza', {
					"pizzasSizedId": product.pizzasSizedId,
					"description": product.description,
					"dopProducts": product.dopProducts
				})
				return data.message
			}
			
		}catch (e) { console.log(e) }
	}
	
	static async delete (id) {
		try {
			const { data } = await  axios.delete(`/api/basketpizza/${id}`)
			return data.message
		}catch (e) { console.log(e) }
	}
	
	static async update (id, quantity) {
		try {
			const { data } = await  axios.put(`/api/basketpizza/update?id=${id}&quantity=${quantity}`)
			return data.message
		}catch (e) { console.log(e) }
	}
	
	static async deleteDopProduct (basketId, dopProductId) {
		try {
			const { data } = await  axios.post(`/api/basketpizza/dopproduct?basketId=${basketId}&dopProductId=${dopProductId}`)
			return data.message
		}catch (e) { console.log(e) }
	}
}


export default PizzaAxios;