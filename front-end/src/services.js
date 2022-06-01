import http from "./http-common.js";

class DataService {
  async getAllUsers() {
    return await(http.get("/users"));
  }

  async getUser(userId) {
    return await(http.get(`/users/${userId}`));
  }

  async getAllPosts(userId) {
    return await(http.get(`/users/${userId}/posts`));
  }

  async getPost(userId, postId) {
    return await(http.get(`/users/${userId}/post/${postId}`));
  }

  async getAllLikes(userId, postId) {
    return await(http.get(`/users/${userId}/post/${postId}/likes`));
  }

  async getAllDislikes(userId, postId) {
    return await(http.get(`/users/${userId}/post/${postId}/dislikes`));
  }

  async getAllComments(userId, postId) {
    return await(http.get(`/users/${userId}/post/${postId}/comments`));
  }

  // async deletePost(userId,postId) {
  //   return await (http.delete(`/users/${userId}/post/${postId}`));
  // }

  async findUser(user){
    return await (http.post(`/users/login`, user));
  }



  

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