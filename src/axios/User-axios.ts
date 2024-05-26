import axios from './axios'

class UserAxios {
	static async login(email?:string, code?:string) {
		try {
			const dataPost: {
                email?:string,
                code?:string
            } = {};
			
			if (email) {
				dataPost.email = email;
			} else {
				dataPost.code = code;
			}

			const data = await axios.post('/api/user/login', dataPost);
            return data;
        } catch (e) {
            return(e.response);
        }
	}
	
	static async changeUsername(username:string) {
		try {
			const data = await axios.patch(`/api/user/username`, { username });
            return data;
        } catch (e) {
            return(e.response);
        }
	}
	
	static async changeEmail(email:string) {
		try {
			const  data  = await axios.patch(`/api/user/email`, { email });
			return data;
        } catch (e) {
            return(e.response);
        }
	}
	
	static async changePhone(phone:string) {
		try {
			const  data  = await axios.patch(`/api/user/phone`, { phone });
			return data;
        } catch (e) {
            return(e.response);
        }
	}
}

export default UserAxios;
