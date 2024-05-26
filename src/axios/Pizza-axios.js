import axios from './axios'
class PizzaAxios {
	static async add(product) {
		try {
			let postData = {
				description: product.description,
				dopProducts: product.dopProducts
			};
			
			if (product.basketCombos && product.basketCombos.array.length) {
				postData.comboId = product.basketCombos.comboId;
				postData.basketCombos = product.basketCombos.array;
			} else if (product.productId) {
				postData.productId = product.productId;
			} else {
				postData.pizzasSizedId = product.pizzasSizedId;
			}
			
			const data  = await axios.post('/api/basketpizza', postData);
			return data;
		} catch (e) {
			return(e.response);
		}
	}
	
	static async delete(id) {
		try {
			const data  = await axios.delete(`/api/basketpizza/${id}`);
			return data;
		} catch (e) {
			return(e.response);
		}
	}
	
	static async update(id, quantity = 1) {
		try {
			const  data  = await axios.patch(`/api/basketpizza/update?id=${id}&quantity=${quantity}`);
			return data;
		} catch (e) {
			return(e.response);
		}
	}
	
	static async deleteDopProduct(basketId, dopProductId) {
		try {
			const  data  = await axios.post(`/api/basketpizza/dopproduct?basketId=${basketId}&dopProductId=${dopProductId}`);
			return data;
		} catch (e) {
			return(e.response);
		}
	}
	
	static async clearBasket() {
		try {
			const data = await axios.get(`/api/basketpizza/clear`);
			return data;
		} catch (e) {
			return(e.response);
		}
	}
}

export default PizzaAxios;
