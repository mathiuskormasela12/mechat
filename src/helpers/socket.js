import {io} from 'socket.io-client';
import {APP_URL} from '@env';

const socket = io(APP_URL);

export default socket;
