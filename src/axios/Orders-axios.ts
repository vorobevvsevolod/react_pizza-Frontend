import axios from './axios'


class OrdersAxios {
	static async create(obj:any) {
        try {
            const  data  = await axios.post(`/api/orders`, obj);
            return data;
        } catch (e) {
            return e.response
        }
	}

    static async Search(nomer:string) {
        try {
            if (!nomer) {
                throw new Error('Не передан номер телефона');
            }
            const  data  = await axios.get(`/api/orders/search?nomer=${nomer}`);
            return data;
        } catch (e) {
            console.error(e);
            throw new Error('Ошибка при поиске заказа по номеру телефона');
        }
    }
}


export default OrdersAxios;