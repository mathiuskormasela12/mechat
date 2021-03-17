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

  getContactById(token, id) {
    return http(token).get(`/contact/${id}`);
  }

  createChat(token, data) {
    return http(token).post('/chat', data);
  }

  upload(token, id, data) {
    return http(token).put(`/user/upload/${id}`, data);
  }

  editAbout(token, id, data) {
    return http(token).put(`/user/about/${id}`, data);
  }

  editStatus(token, id, data) {
    return http(token).put(`/user/status/${id}`, data);
  }

  deleteAccount(token, id) {
    return http(token).delete(`/user/${id}`);
  }

  editPhone(token, id, data) {
    return http(token).put(`/user/phonenumber/${id}`, data);
  }

  editEmail(token, id, data) {
    return http(token).put(`/user/email/${id}`, data);
  }

  createContact(token, data) {
    return http(token).post('/contact', data);
  }

  getChatHistory(token, data) {
    return http(token).get(
      `/history/?page=${data.page}&search=${data.keyword}&sort=${data.sort}`,
    );
  }

  getChatList(token, id, data) {
    return http(token).get(
      `/chat/${id}/?page=${data.page}&search=${data.keyword}`,
    );
  }

  getContactList(token, data) {
    return http(token).get(
      `/contact?page=${data.page}&sort=${data.sort}&by=${data.by}&search=${data.keyword}`,
    );
  }
}

export default new Services();
