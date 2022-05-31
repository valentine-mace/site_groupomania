import http from "./http-common.js";

class DataService {
  async getAllUsers() {
    return await(http.get("/users"));
  }

  // async getAllPosts(userId) {
  //   return await(http.get(`/users/${userId}/posts`));
  // }

  // get(id) {
  //   return http.get(`/tutorials/${id}`);
  // }
  // create(data) {
  //   return http.post("/tutorials", data);
  // }
  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }
  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }
  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }
  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}
export default new DataService();