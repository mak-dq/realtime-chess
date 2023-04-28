import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('access-token');
console.log("Bearer token", token);

const NewInstance = axios.create({
  
  // Configuration
  baseURL: 'http://192.168.10.81:3000/api/',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('access-token')}`,
    'ngrok-skip-browser-warning': 'true',
  },
});
console.log("Bearer token", token);
export default NewInstance;
