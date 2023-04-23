import axios from './index'


class UserAxios {

	static async login (email, code){
		try {
			let dataPost = {};

			if(email) dataPost = {"email": email}
				else dataPost = {"code": code};

			const { data } = await axios.post('/api/user/login', dataPost)
			return data.message
		}catch (e) { return e }
	}
	static async changeUsername(username) {
		try {
			const { data } = await  axios.put(`/api/user/username?username=${username}`)
			return data.message
		}catch (e) { console.log(e) }
	}
	
	static async changeEmail(email) {
		try {
			const { data } = await  axios.put(`/api/user/email?email=${email}`)
			return data.message
		}catch (e) { console.log(e) }
	}
	
	static async changePhone(phone) {
		try {
			const { data } = await  axios.put(`/api/user/phone?phone=${phone}`)
			return data.message
		}catch (e) { console.log(e) }
	}
}


export default UserAxios;