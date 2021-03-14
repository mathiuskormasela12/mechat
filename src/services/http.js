import axios from 'axios';
import {API_URL} from '@env';

function http(token) {
  const headers = token && {
    authorization: token,
  };

  return axios.create({
    baseURL: API_URL,
    headers,
  });
}

export default http;
