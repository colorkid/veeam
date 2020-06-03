import PostsLists from "../PostsLists/PostsLists";

const CLASS_NAME_SECTION = 'user-posts';

export default class UserPostsSection {
  constructor (container) {
    this.container = container;

    this.posts = new PostsLists();
  }

  _createContainer(data) {
    const className = CLASS_NAME_SECTION;
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    container.appendChild(this.posts.render(data));

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  removeContainer() {
    document.querySelector(`.${CLASS_NAME_SECTION}`)
      && document.querySelector(`.${CLASS_NAME_SECTION}`).remove();
  }

  render(data) {
    this.container.appendChild(this._createContainer(data));
  }
}