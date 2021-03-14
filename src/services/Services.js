import http from './http';

class Services {
  auth(data) {
    return http(null).post('/auth', data);
  }

  checkOtp(id, data) {
    return http(null).put(`/auth/otp/${id}`, data);
  }
}

export default new Services();
