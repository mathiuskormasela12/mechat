import http from './http';

class Services {
  auth(data) {
    return http(null).post('/auth', data);
  }

  checkOtp(id, data) {
    return http(null).put(`/auth/otp/${id}`, data);
  }

  editFullName(id, data) {
    return http(null).put(`/user/fullname/${id}`, data);
  }

  getUserById(token, id) {
    return http(token).get(`/user/${id}`);
  }

  upload(token, id, data) {
    return http(token).put(`/user/upload/${id}`, data);
  }

  editAbout(token, id, data) {
    return http(token).put(`/user/about/${id}`, data);
  }

  editPhone(token, id, data) {
    return http(token).put(`/user/phonenumber/${id}`, data);
  }

  editEmail(token, id, data) {
    return http(token).put(`/user/email/${id}`, data);
  }
}

export default new Services();
