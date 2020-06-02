import PostsLists from "../PostsLists/PostsLists";

export default class UserPosts {
  constructor (container) {
    this.container = container;

    this.posts = new PostsLists();
  }

  _createContainer(data) {
    const className = 'user-posts';
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    container.appendChild(this.posts.render(data));

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  removeContainer() {
    document.querySelector(`.user-posts`)
      && document.querySelector(`.user-posts`).remove();
  }

  render(data) {
    this.container.appendChild(this._createContainer(data));
  }
}