import axios from 'axios';

const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
}

const instance = axios.create({
    baseURL: 'https://young-everglades-84944.herokuapp.com', 
    headers: headers
}
); // http://localhost:8090 // https://young-everglades-84944.herokuapp.com/

export default instance;