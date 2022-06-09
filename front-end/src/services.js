import http from "./http-common.js";

class DataService {
  async getAllUsers() {
    return await(http.get("/users"));
  }

  async getUser(userId) {
    return await(http.get(`/users/${userId}`));
  }

  async getAdmin(userId) {
    return await(http.get(`/users/${userId}/admin`));
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

  async deletePost(userId,postId) {
    return await (http.delete(`/users/${userId}/post/${postId}`));
  }

  async deleteUser(userId) {
    return await (http.delete(`/users/${userId}`));
  }

  async updateUser(userId, user) {
    return await (http.put(`/users/${userId}`, user));
  }

  async findUser(user){
    return await (http.post(`/users/login`, user));
  }

  async createUser(user){
    return await (http.post(`/users/signup`, user));
  }

  async createPost(userId, user){
    return await (http.post(`/users/${userId}/post`, user));
  }

  async getRecentPosts(userId) {
    return await(http.get(`/users/${userId}/recentPosts`));
  }

  async likePost(userId,postId){
    return await (http.post(`/users/${userId}/post/${postId}/like`));
  }

  async dislikePost(userId,postId){
    return await (http.post(`/users/${userId}/post/${postId}/dislike`));
  }

  async postComment(userId,postId, comment){
    return await (http.post(`/users/${userId}/post/${postId}/comment`, comment));
  }

  async deleteComment(userId,postId, commentId){
    return await (http.delete(`/users/${userId}/post/${postId}/comment/${commentId}`));
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