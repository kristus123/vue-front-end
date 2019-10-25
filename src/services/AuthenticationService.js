
import instance from '@/services/AxiosService.js';

class AuthenticationService {
    async signup(username, password) {
        return instance.post("v1/users/signup", {
            username : username,
            password : password
        }).then(response => {
            console.log(response.data)
            this.login(username, password);
            return (response.data);
        });
    }

    isAuthenticated() {
        return localStorage.getItem('user-token') ? true : false;
    }

    async login(username, password) {
        return instance.post(`/api/authenticate?username=${username}&password=${password}`)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('user-token', response.data.token);
                console.log("authenticated")
                console.log(response.data)


                //instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
                instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;


                return response.data;


            })
            .catch(error => { console.log(error); return false; });
    }


    async getUserInfo() {
        return instance.get("v1/users/me")
            .then(response => response.data);
    }


}

const authenticationService = new AuthenticationService()

export default authenticationService;


