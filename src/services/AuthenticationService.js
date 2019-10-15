
import instance from '@/services/AxiosService.js';

class AuthenticationService {
    async hello() {
        return instance.post("/users/signup", {
                "username": "admaasdiadsdaasn",
                "password": "heasdasdsasddai",
                "email": "admin@easdmaaasasdddsil.com",
                "roles": [
                  "ROLE_ADMIN"
                ]
        }).then(response => {
            console.log(response.data)
            return response.data
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
                
                
                return response.data ;
                

            })
            .catch(error => {console.log(error); return false;});
        }


        async getUserInfo() {
            return instance.get("v1/users/me")
                .then(response => response.data);
        }


}

const authenticationService = new AuthenticationService()

export default authenticationService;


