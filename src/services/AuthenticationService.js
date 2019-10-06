import axios from 'axios';


const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
}

const instance = axios.create({
        baseURL: 'https://young-everglades-84944.herokuapp.com/',
        headers: headers
    }
); // http://localhost:8090


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
        return instance.post(`/users/signin?username=${username}&password=${password}`)
            .then(response => {
                localStorage.setItem('user-token', response.data);
                console.log("authenticated")
    
                //instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
                instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
                
                
                return response.data ;
                

            })
            .catch(error => {console.log(error); return false;});
        }


        async getUserInfo() {
            return instance.get("/users/me")
                .then(response => response.data);
        }


}

const authenticationService = new AuthenticationService()

export default authenticationService;


