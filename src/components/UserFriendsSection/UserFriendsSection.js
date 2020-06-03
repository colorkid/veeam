import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search"
import FriendsList from "../FriendsList/FriendsList";

const CLASS_NAME_SECTION = 'user-friend';
const FRIENDS_LIST_CONTAINER_CLASS = 'friend-list';

export default class UserFriendsSection {
  constructor (container, handlers) {
    this.container = container;
    this.handlers = handlers;
    this.search = new Search({
      filterFriends: this.handlers.filterFriends
    });
    this.pagination = new Pagination({
      changeActivePage: this.handlers.changeActivePage
    });
    this.friendsList = new FriendsList();
  }

  reRenderFriendsList(data) {
    const container = document.querySelector(`.${FRIENDS_LIST_CONTAINER_CLASS}`);
    this.friendsList.renderFriends(data, container)
  }

  _createContainer(data) {
    const className = CLASS_NAME_SECTION;
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    container.appendChild(this.search.render());
    container.appendChild(this.friendsList.render(data.data, FRIENDS_LIST_CONTAINER_CLASS));
    container.appendChild(this.pagination.render({
      activePage: data.activePage,
      pages: data.pages
    }));

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