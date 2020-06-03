export default class Api {
  async getUserInfo() {
    return await fetch(`https://randomuser.me/api/`)
  };

  async getUserFriends(page = 1) {
    return await fetch(`https://reqres.in/api/users?page=${page}`)
  };

  async getUserPosts() {
    return await fetch(`https://jsonplaceholder.typicode.com/posts`)
  };
}