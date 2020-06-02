import {createNode} from "../../utils/utils";

export default class FriendsList {
  _createContainer(friends, className) {
    const itIsAlready = document.querySelector(`.${className}`);
    if (itIsAlready) itIsAlready.remove();

    const container = document.createElement('div');
    container.className = className;

    this.renderFriends(friends, container);

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  _removeChildren(container) {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
  }

  _showEmptyListMessage() {
    const container = document.createElement('h2');
    container.className = 'empty-list';
    container.textContent = 'No one was found';

    const fragment = document.createDocumentFragment();
    return fragment.appendChild(container);
  }

  renderFriends(friends, container) {
    this._removeChildren(container);

    if (!friends.length) {
      container.appendChild(this._showEmptyListMessage());
      return;
    }

    friends.forEach(friend => {
      const dataForAvatar = {
        avatar: friend.avatar,
        firstName: friend.first_name,
        lastName: friend.last_name
      };

      const avatarPic = createNode('friend__img', 'img', dataForAvatar);
      const firstName = createNode('friend__name', 'p', friend.first_name);
      const lastName = createNode('friend__name', 'p', friend.last_name);
      const emailLink = createNode('friend__a', 'a', friend.email, 'email');
      const email = createNode('friend__email', 'p', 'email: ', '', [emailLink]);

      const leftSide = createNode('friend__left', 'div', '', '', [avatarPic]);
      const rightSide = createNode('friend__right', 'div', '', '', [firstName, lastName, email]);

      const friendItem = createNode('friend', 'div', '', '', [leftSide, rightSide]);

      container.appendChild(friendItem);
    });
  }

  render(friends, className) {
    return this._createContainer(friends, className);
  }

}