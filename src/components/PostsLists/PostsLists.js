import {createNode} from "../../utils/utils";

export default class PostsLists {
  _createContainer(posts) {
    const className = 'posts';
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    this._renderPosts(posts, container);

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  _renderPosts(posts, container) {
    posts.forEach(post => {
      const title = createNode('post__title', 'h5', post.title);
      const postText = createNode('post__text', 'p', post.body);
      const postItem = createNode('post', 'div', '', '', [title, postText]);

      container.appendChild(postItem);
    });
  }

  render(posts) {
    return this._createContainer(posts);
  }
}