import {io} from 'socket.io-client';
import {API_URL} from '@env';
console.log('========= API =====');
console.log(API_URL);
const socket = io('http://192.168.1.32:5000');

export default socket;
